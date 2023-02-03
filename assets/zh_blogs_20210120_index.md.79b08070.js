import{_ as s,c as n,o as a,e as l}from"./app.68e2223d.js";const i=JSON.parse('{"title":"Rust：克隆trait object？","description":"Rust中克隆Trait Object遇到的坑","frontmatter":{"title":"Rust：克隆trait object？","description":"Rust中克隆Trait Object遇到的坑","tags":["Rust"]},"headers":[{"level":2,"title":"Trait Object","slug":"trait-object","link":"#trait-object","children":[]},{"level":2,"title":"具体问题分析","slug":"具体问题分析","link":"#具体问题分析","children":[]},{"level":2,"title":"2023/01/05 更新","slug":"_2023-01-05-更新","link":"#_2023-01-05-更新","children":[]}],"relativePath":"zh/blogs/20210120/index.md"}'),o={name:"zh/blogs/20210120/index.md"},p=l(`<nav class="table-of-contents"><ul><li><a href="#trait-object">Trait Object</a></li><li><a href="#具体问题分析">具体问题分析</a></li><li><a href="#_2023-01-05-更新">2023/01/05 更新</a></li></ul></nav><h1 id="rust-克隆trait-object" tabindex="-1">Rust：克隆trait object？ <a class="header-anchor" href="#rust-克隆trait-object" aria-hidden="true">#</a></h1><p>最近遇到了这个问题，参考了<a href="https://stackoverflow.com/questions/30353462/how-to-clone-a-struct-storing-a-boxed-trait-object" target="_blank" rel="noreferrer">stack overflow</a>，顺便做一下记录和翻译。</p><h2 id="trait-object" tabindex="-1">Trait Object <a class="header-anchor" href="#trait-object" aria-hidden="true">#</a></h2><p>Trait及Trait Object最基础的内容可以回顾官方文档。</p><p>Trait Object实现的是<strong>Dynamic Dispatch</strong> 。这是一个术语，描述的是编译器在编译期时并不能知道调用哪个方法，只有在运行时才能确定的情况，也叫<strong>late-binding</strong>。</p><p>Trait Object通过在运行时提供具体的值来实现Dynamic Dispatch。Trait Object包含一个指向data指针和一个指向“vtable” 的指针。data 指针提供了trait object 存储的数据的地址，vtable 指针则指向了关联着实现了该trait的不同类型的vtable (“virtual method table”) ，其中存储着可以调用的方法（也就是虚函数表）。Trait objects有时也被称作type erasure，因为编译器并不清楚运行期时的具体类型。</p><p>注意我们这里讨论的是多态，和泛型不同。当然Rust在模板中，可以添加限制：trait bound，但是在运行时依然只能有一种类型。再具体一些，例如</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GenericObject</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Trait</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    contents</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>和</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TraitObject</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    contents</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Vec</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Trait</span><span style="color:#89DDFF;">&gt;&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>是不同的。前者在实例化的时候，<code>contents</code>只能包含一种实现了<code>Trait</code>的类型，而后者的<code>contents</code>中可以包含任意实现了<code>Trait</code>的类型。</p><p>做个类比，trait及trait object类似Java中的interface或者C++的虚类的用法，Rust没有继承语义，所以通过这种<code>impl xx_trait for xx_struct</code> 的方式实现继承和多态；而trait bound则更接近C++中模板的concept概念，是一种模板特化的语法糖。</p><h2 id="具体问题分析" tabindex="-1">具体问题分析 <a class="header-anchor" href="#具体问题分析" aria-hidden="true">#</a></h2><p>在创建结构体的时候，我们可能想要在其中保存实现了某个trait的object，此时就需要用到trait object。例如下面的例子中，我们创建了一个名为Animal的trait，用来刻画动物应该具有的特征，他们需要能够讲话！于是提供了一个名为<code>speak</code>的接口。而另一个名为AnimalHouse的trait中，去实现一个动物们居住的房子，这个房子，显然是可以住进任何动物的，所以我们用<code>Box&lt;dyn Animal&gt;</code>来表示这里需要一个trait object，他需要实现Animal这个trait。</p><div class="language-Rust"><button title="Copy Code" class="copy"></button><span class="lang">Rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">trait</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">to_string</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;{}</span><span style="color:#C3E88D;">: ruff, ruff!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalHouse</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    animal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> house </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalHouse</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        animal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Dog</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bobby</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    house</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">animal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>首先，克隆一个 <code>Box</code> 其实不具有好的语义，因为它和 C++ 中的 <code>unique_ptr</code> 一般，具有独占的语义。 如果想要多个指针指向同一个对象，该使用 <code>Rc</code>，具有 <code>shared_ptr</code> 的语义。 那么这里的克隆显然是想要深拷贝一份。那直接 <code>(*box).clone()</code> 好不好呢？也不好，如下。</p><p>这个时候，如果我们想要复制<code>house</code>变量，如<code>house.clone()</code>就会报错，提示我们没有实现<code>Clone</code>Trait，但是当你给<code>AnimalHouse</code>和<code>Animal</code>都derive了一个，又会导致<code>Animal</code>类型<code>not object-safe [E0038]</code>，这是什么原因呢？事实上这个问题是<code>Clone</code> Trait导致的，我们直接做<code>&amp;house as &amp;Clone</code>也是无法进行类型转换的。</p><p>因为<code>Clone</code>这个Trait本身是要求实现者是实现了<code>Sized</code>的Trait的，即在克隆时候，要保证大小是确定的，能够开辟等量的空间进行复制。但是<code>Clone</code>的方法<code>fn clone(&amp;self) -&gt; Self</code>和<code>fn clone_from(&amp;mut self, source: &amp;Self) </code>中，除了<code>self</code>以外的参数或返回值也含有<code>Self</code>类型。</p><p>回顾上面谈到的，trait object在实现的时候dynamic dispatch的，我们根本不知道这个trait object对应的实际类型，因为它可以是任何一个实现了该trait的类型的值，所以<code>Self</code>在这里的大小不是<code>Self: Sized</code>的，这样的trait是不能成为trait object的。</p><p>最开始给出的<a href="https://stackoverflow.com/questions/30353462/how-to-clone-a-struct-storing-a-boxed-trait-object" target="_blank" rel="noreferrer">stack overflow</a>中的老哥，给出了一个很有趣的解决方案。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">trait</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalClone</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Splitting AnimalClone into its own trait allows us to provide a blanket</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// implementation for all compatible types, without having to implement the</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// rest of Animal.  In this case, we implement it for all types that have</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &#39;static lifetime (*i.e.* they don&#39;t contain non-&#39;static pointers), and</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// implement both Animal and Clone.  Don&#39;t ask me how the compiler resolves</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// implementing AnimalClone for Animal when Animal requires AnimalClone; I</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// have *no* idea why this works.</span></span>
<span class="line"><span style="color:#C792EA;">trait</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalClone</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">clone_box</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalClone</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">T</span></span>
<span class="line"><span style="color:#F78C6C;">where</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">T</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#FFCB6B;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Clone</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">clone_box</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">clone</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// We can now implement Clone manually by forwarding to clone_box.</span></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Clone</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">clone</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">clone_box</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">#[</span><span style="color:#A6ACCD;">derive</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Clone</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">to_string</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">impl</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dog</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}</span><span style="color:#C3E88D;">: ruff, ruff!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">#[</span><span style="color:#A6ACCD;">derive</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Clone</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalHouse</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    animal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F78C6C;">dyn</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Animal</span><span style="color:#89DDFF;">&gt;,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> house </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AnimalHouse</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        animal</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Box</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Dog</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">new</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bobby</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)),</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> house2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> house</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">clone</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    house2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">animal</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">speak</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>也是挺离谱的，通过构造一个辅助的Trait <code>AnimalClone</code>，作为<code>Animal</code>的super trait，绕开object-safe的问题。</p><p>还有另一个解决方法：Rust中的<code>Box</code>智能指针类似于C++中的<code>unique_ptr</code>，唯一指向某个object，所以调用<code>clone()</code>的话我们必然是在克隆它指向的trait object。而类似<code>shared_ptr</code>，Rust也提供了<code>RC</code>智能指针，运行多个指针同时指向同一个object。因此一个可行的解决方法是将<code>Animal</code>类中<code>Box</code>指针换成<code>RC</code>，此时可以完成克隆。但是注意这里只是把指针克隆了一个，即新建了同一个指向trait object的指针，并没有实现对trait object的克隆。治标不治本！</p><p>部分内容也参考自：</p><ul><li><p><a href="https://blog.knoldus.com/get-your-hands-wet-with-traits-object-of-rust/" target="_blank" rel="noreferrer">https://blog.knoldus.com/get-your-hands-wet-with-traits-object-of-rust/</a></p></li><li><p><a href="https://www.136.la/jiaocheng/show-7351.html" target="_blank" rel="noreferrer">https://www.136.la/jiaocheng/show-7351.html</a></p></li></ul><h2 id="_2023-01-05-更新" tabindex="-1">2023/01/05 更新 <a class="header-anchor" href="#_2023-01-05-更新" aria-hidden="true">#</a></h2><p>最近写 rocket 的中间件的时候又碰到了这个东西 = = Interesting</p><p><a href="https://docs.rs/rocket/0.5.0-rc.2/rocket/route/trait.Cloneable.html" target="_blank" rel="noreferrer">Cloneable in rocket::route - Rust (docs.rs)</a></p><p>看上去是 rocket 在管理路由的时候，在 <code>rocket::Route</code> 用了 <code>Box&lt;dyn Handler&gt;</code> 来存储任意实现了 <code>trait Handler</code> 的类型的句柄，因此在克隆的时候碰到了这个问题，于是采用了上面讨论的这种方法。</p>`,30),e=[p];function t(c,r,F,D,y,C){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};