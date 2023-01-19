import{_ as s,c as a,o as n,e as l}from"./app.f30d18e1.js";const A=JSON.parse('{"title":"Rust 基础备忘","description":"大基本功","frontmatter":{"title":"Rust 基础备忘","description":"大基本功","tags":["Rust"]},"headers":[{"level":2,"title":"String vs str","slug":"string-vs-str","link":"#string-vs-str","children":[{"level":3,"title":"相互转化","slug":"相互转化","link":"#相互转化","children":[]},{"level":3,"title":"内存的分配","slug":"内存的分配","link":"#内存的分配","children":[]},{"level":3,"title":"应该使用哪一个？","slug":"应该使用哪一个","link":"#应该使用哪一个","children":[]}]},{"level":2,"title":"Life Time","slug":"life-time","link":"#life-time","children":[{"level":3,"title":"引用传参","slug":"引用传参","link":"#引用传参","children":[]},{"level":3,"title":"返回引用","slug":"返回引用","link":"#返回引用","children":[]},{"level":3,"title":"结构体","slug":"结构体","link":"#结构体","children":[]},{"level":3,"title":"多个生命周期参数","slug":"多个生命周期参数","link":"#多个生命周期参数","children":[]}]},{"level":2,"title":"Trait","slug":"trait","link":"#trait","children":[]},{"level":2,"title":"与 C++ 结合","slug":"与-c-结合","link":"#与-c-结合","children":[]},{"level":2,"title":"杂项","slug":"杂项","link":"#杂项","children":[]},{"level":2,"title":"安全性","slug":"安全性","link":"#安全性","children":[{"level":3,"title":"C++的情况","slug":"c-的情况","link":"#c-的情况","children":[]},{"level":3,"title":"Rust是怎么做的","slug":"rust是怎么做的","link":"#rust是怎么做的","children":[]}]},{"level":2,"title":"References","slug":"references","link":"#references","children":[]}],"relativePath":"zh/blogs/20210312/index.md"}'),p={name:"zh/blogs/20210312/index.md"},o=l(`<nav class="table-of-contents"><ul><li><a href="#string-vs-str">String vs str</a><ul><li><a href="#相互转化">相互转化</a></li><li><a href="#内存的分配">内存的分配</a></li><li><a href="#应该使用哪一个">应该使用哪一个？</a></li></ul></li><li><a href="#life-time">Life Time</a><ul><li><a href="#引用传参">引用传参</a></li><li><a href="#返回引用">返回引用</a></li><li><a href="#结构体">结构体</a></li><li><a href="#多个生命周期参数">多个生命周期参数</a></li></ul></li><li><a href="#trait">Trait</a></li><li><a href="#与-c-结合">与 C++ 结合</a></li><li><a href="#杂项">杂项</a></li><li><a href="#安全性">安全性</a><ul><li><a href="#c-的情况">C++的情况</a></li><li><a href="#rust是怎么做的">Rust是怎么做的</a></li></ul></li><li><a href="#references">References</a></li></ul></nav><h1 id="rust-基础备忘" tabindex="-1">Rust 基础备忘 <a class="header-anchor" href="#rust-基础备忘" aria-hidden="true">#</a></h1><p>转载和记录一些印象不深的碎片知识</p><h2 id="string-vs-str" tabindex="-1">String vs str <a class="header-anchor" href="#string-vs-str" aria-hidden="true">#</a></h2><p>当我们需要引用一个被拥有的UTF-8文本的区间(range)，或者当我们使用字符串字面量(string literals)时，我们就需要使用字符串切片(也就是 <code>str</code>)。<code>&amp;str</code> 不负责任地说，可以理解成 C++ 中的 <code>char *</code> 和 <code>string_view</code>。<code>string_view</code>是 C++17 中为解决字符串频繁拷贝问题而提出的 ，在一些只需要做查找、遍历、打印的函数中，参数的常量引用传递并不能完全解决拷贝问题，如果传参时候传的是常量引用传递，内部一旦使用赋值等运算仍然会发生拷贝，会在堆上重新分配空间浪费时间，所以它和<code>&amp;str</code>都相当于是字符指针的包装类型，不拥有数据，只是划一个区间。</p><p><code>String</code> 则可以认为和 C++ 中相同，是一个会自动分配空间的容器（而 Java 的 String 是常量）。</p><h3 id="相互转化" tabindex="-1">相互转化 <a class="header-anchor" href="#相互转化" aria-hidden="true">#</a></h3><p>像<code>println!</code>，<code>format!</code> 这些宏都是要传 <code>&amp;str</code> 的。</p><p><code>String</code> 转 <code>&amp;str</code>：</p><ul><li><code>String</code> 类型在引用时， <code>&amp;String</code> 可以自动转化为 <code>&amp;str</code>，编译器会帮忙干活，该特性叫 <code>deref coercing</code></li><li>使用<code>&amp;some_string[..]</code> 这样完整的写法，利用了String重载的Index操作</li><li><code>as_str()</code>，<code>as_ref()</code>，<code>as_borrow()</code></li></ul><p><code>&amp;str</code> 转 <code>String</code>：</p><ul><li><code>into()</code> （这本质上是因为 <code>String</code> 实现了 <code>From&lt;&amp;&#39;_ str&gt;</code> 这个 trait ，调用了<code>to_owned()</code></li><li>to_owned()，因为原来没有所有权么，所以要 <code>to_owned</code> 成 <code>String</code> 拿到所有权</li><li><code>to_string()</code> 调用的是 <code>String::from()</code></li><li><code>String::from()</code></li></ul><h3 id="内存的分配" tabindex="-1">内存的分配 <a class="header-anchor" href="#内存的分配" aria-hidden="true">#</a></h3><p>讨论内存分配的例子：</p><p><code>let my_name = &quot;Pascal&quot;.to_string();</code></p><p>那么</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">buffer</span></span>
<span class="line"><span style="color:#A6ACCD;">                   /   capacity</span></span>
<span class="line"><span style="color:#A6ACCD;">                 /   /  length</span></span>
<span class="line"><span style="color:#A6ACCD;">               /   /   /</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">stack frame │ • │ 8 │ 6 │ &lt;- my_name: String</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–│–+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">              │</span></span>
<span class="line"><span style="color:#A6ACCD;">            [–│–––––––– capacity –––––––––––]</span></span>
<span class="line"><span style="color:#A6ACCD;">              │</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–V–+–––+–––+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">       heap │ P │ a │ s │ c │ a │ l │   │   │</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–––+–––+–––+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            [––––––– length ––––––––]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Rust会在栈上存储<code>String</code>对象。这个对象里包含以下三个信息: 一个<strong>指针</strong>指向一块分配在堆上的缓冲区，这也是数据真正存储的地方，数据的<strong>容量</strong>和<strong>长度</strong>。因此，<code>String</code>对象本身长度总是固定的三个字(word)。</p><p>如果我们只是对存储在<code>my_name</code>中的last name感兴趣，我们可以像下面这样来获取一个针对字符串中的特定部分的引用:</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> my_name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Pascal</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">to_string</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">my_name</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push_str</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> Precht</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> last_name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">my_name</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">7</span><span style="color:#89DDFF;">..];</span></span>
<span class="line"></span></code></pre></div><p>通过指定从第7个字节(因为有空格)开始一直到缓冲区的结尾(&quot;..&quot;)，<code>last_name</code>现在是一个引用自<code>my_name</code>拥有的文本的字符串切片(string slice)。它借用了这个文本。这里是它在内存中的样子:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">my_name: String   last_name: &amp;str</span></span>
<span class="line"><span style="color:#A6ACCD;">            [––––––––––––]    [–––––––]</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–––+––––+––––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">stack frame │ • │ 16 │ 13 │   │ • │ 6 │ </span></span>
<span class="line"><span style="color:#A6ACCD;">            +–│–+––––+––––+–––+–│–+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                 │</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                 +–––––––––+</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                           │</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                           │</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                         [–│––––––– str –––––––––]</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–V–+–––+–––+–––+–––+–––+–––+–V–+–––+–––+–––+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">       heap │ P │ a │ s │ c │ a │ l │   │ P │ r │ e │ c │ h │ t │   │   │   │</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>注意<code>last_name</code>没有在栈上存储容量信息。这是因为它只是对一个字符串切片的引用，而该字符串管理它的容量。这个字符串切片，即<code>str</code>本身，是不确定大小(unsized)的。 而且，在实际使用中，字符串切片总是以引用的形式出现，也就是它们的类型总是<code>&amp;str</code>而不是<code>str</code>。</p><p>有两种情况我们需要使用字符串切片：要么创建一个对子字符串的引用，或者我们使用<strong>字符串字面量</strong>(string literals)。</p><p>一个字符串字面量由一串被双引号包含的文本创建，就像这样：</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> my_name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Pascal Precht</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;"> // This is a \`&amp;str\` not a \`String\`</span></span>
<span class="line"></span></code></pre></div><p>下一个问题是，如果<code>&amp;str</code>是一个引用了被(某人)拥有的<code>String</code>的切片，假定这个文本在适当的地方被创建，那么这么<code>String</code>的所有者是谁？</p><p>很显然，字符串字面量有点特殊。他们是引用自“预分配文本(preallocated text)”的字符串切片，这个预分配文本存储在可执行程序的只读内存中。换句话说，这是装载我们程序的内存并且不依赖于在堆上分配的缓冲区。</p><p>也就是说，栈上还有一个入口，指向当程序执行时预分配的内存。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">my_name: &amp;str</span></span>
<span class="line"><span style="color:#A6ACCD;">            [–––––––––––]</span></span>
<span class="line"><span style="color:#A6ACCD;">            +–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">stack frame │ • │ 6 │ </span></span>
<span class="line"><span style="color:#A6ACCD;">            +–│–+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;">              │                 </span></span>
<span class="line"><span style="color:#A6ACCD;">              +––+                </span></span>
<span class="line"><span style="color:#A6ACCD;">                 │</span></span>
<span class="line"><span style="color:#A6ACCD;"> preallocated  +–V–+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;"> read-only     │ P │ a │ s │ c │ a │ l │</span></span>
<span class="line"><span style="color:#A6ACCD;"> memory        +–––+–––+–––+–––+–––+–––+</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>当我们对<code>String</code>和<code>&amp;str</code>的区别有了更好的理解之后，另一个问题也就随之而来了。</p><h3 id="应该使用哪一个" tabindex="-1">应该使用哪一个？ <a class="header-anchor" href="#应该使用哪一个" aria-hidden="true">#</a></h3><p>显然，这取决于很多因素，但是一般地，保守来讲，如果我们正在构建的API不需要拥有或者修改使用的文本，那么应该使用<code>&amp;str</code>而不是<code>String</code>。</p><h2 id="life-time" tabindex="-1">Life Time <a class="header-anchor" href="#life-time" aria-hidden="true">#</a></h2><p>仅在编译期存在，与运行无关</p><p>生命周期参数类似模板参数，可以任意指定名称，除了保留的 <code>&#39;static</code></p><p>当生命周期的名称不重要的时候，可以使用 <code>&#39;_</code> 代表一个不具名的生命周期参数。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Config</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">Config</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>如果像上面这么直接用一个引用，无法通过编译，需要提供一个具名生命周期参数，如下</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    config</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Config</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>当提供了这样一个生命周期后，编译器可以保证引用类型 <code>&amp;Config</code> 变量 <code>config</code> 和 <code>App</code> 具有相同的生命周期，所以不会出现野指针。即编译器会根据编程者对生命周期的描述，进行检查保证引用都会在声明周期之内。</p><p>回顾所有权的定义，在变量超出所有权上下文后，就会被自动 drop 掉，对于引用也是如此</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        r </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>该程序会报错 x 的生命周期不够长，在被 drop 后，r 仍然持有对 x 的引用。</p><h3 id="引用传参" tabindex="-1">引用传参 <a class="header-anchor" href="#引用传参" aria-hidden="true">#</a></h3><p>当传递引用时</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">some_function</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">val</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><code>some_function</code> 接收一个对于<code>i32</code> 类型的引用，随便给了一个生命周期参数<code>&#39;a</code>。于是编译器就知道<code>some_function</code> 不会也不应该去把 <code>val</code> 存储到任何一个可能超出该函数生命周期的地方。</p><p>如果 <code>some_function</code> 采用生命周期参数<code>&#39;static</code>就不同了，Rust 会认为该参数是一个全局变量。这种情况下，只有<code>static</code> 变量才能作为函数参数。</p><h3 id="返回引用" tabindex="-1">返回引用 <a class="header-anchor" href="#返回引用" aria-hidden="true">#</a></h3><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">smallest_number</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;(</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">i32</span><span style="color:#89DDFF;">])</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">mut</span><span style="color:#A6ACCD;"> s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> r </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">..]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> r </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> s </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    s</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>上面的生命周期标识表明返回值和参数的生命周期是相同的，在调用函数处，如果输入参数的生命周期结束了，返回值也就不能再被引用了。事实上，上面的代码中不显式地标明生命周期参数也可以，编译器会自动完成推导。</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> numbers </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#A6ACCD;">    s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">smallest_number</span><span style="color:#89DDFF;">(&amp;</span><span style="color:#A6ACCD;">numbers</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> s</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>也就是说，这段代码会报错，因为在括号外，<code>numbers</code> 被 drop 掉了，所以 <code>s</code>也就无法引用函数返回值了。</p><h3 id="结构体" tabindex="-1">结构体 <a class="header-anchor" href="#结构体" aria-hidden="true">#</a></h3><p>也就是一开始的那段代码。为什么编译器不能自动帮我们拓展一下生命周期？事实上在早期的编译器实现中，确实是这么干的，但是开发者发现有时会引发歧义，不如明确标识出引用的生命周期。</p><p>需要注意的是，当前面代码中的 <code>App</code>结构体被其他类型借用时，也需要提供生命周期参数，即</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Platform</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">App</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="多个生命周期参数" tabindex="-1">多个生命周期参数 <a class="header-anchor" href="#多个生命周期参数" aria-hidden="true">#</a></h3><p>考虑下面两种定义，第二种才是符合调用时要求的定义</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/// The same lifetime annotation</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Point</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/// Different lifetime annotation</span></span>
<span class="line"><span style="color:#C792EA;">struct</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Point</span><span style="color:#89DDFF;">&lt;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#FFCB6B;">b</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&#39;</span><span style="color:#FFCB6B;">b</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">i32</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> y </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> point </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Point</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">y </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">        r </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> point</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> r</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>在第一种定义下，编译器会自动选择更短的生命周期，即成员<code>x</code> 和 <code>y</code> 都会被当做 <code>y</code> 的生命周期。</p><h2 id="trait" tabindex="-1">Trait <a class="header-anchor" href="#trait" aria-hidden="true">#</a></h2><ul><li>Trait 比较烦的一点是在使用相关的类的时候，记得把它实现的 trait 也要 use 到。</li><li>递归相关的 trait、复制相关的 trait 遇到问题可以回顾过往的笔记。</li></ul><h2 id="与-c-结合" tabindex="-1">与 C++ 结合 <a class="header-anchor" href="#与-c-结合" aria-hidden="true">#</a></h2><p>标准库中几个常用的</p><ul><li>std::os::raw</li><li>std::ffi</li></ul><p><a href="http://crates.io/" target="_blank" rel="noreferrer">http://crates.io/</a> 上的库</p><ul><li>clib</li><li>inx</li></ul><p><code>std::io::Error::last_os_error</code> 这个函数，是用来捕获函数操作失败后，内核反馈给我们的错误。</p><h2 id="杂项" tabindex="-1">杂项 <a class="header-anchor" href="#杂项" aria-hidden="true">#</a></h2><ul><li><p>关键字 <code>ref</code>，<code>deref</code> 等价于 <code>&amp;</code> 和 <code>*</code>，即</p><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#F78C6C;">3</span><span style="color:#FFCB6B;">u8</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">ref</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#FFCB6B;">u8</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">assert_eq!</span><span style="color:#89DDFF;">(*</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,*</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span></code></pre></div></li><li><p>2018 版里，不用 <code>extern crate</code> 了，可以直接 <code>use</code></p></li></ul><h2 id="安全性" tabindex="-1">安全性 <a class="header-anchor" href="#安全性" aria-hidden="true">#</a></h2><blockquote><p>If it compiles, then it works.</p></blockquote><h3 id="c-的情况" tabindex="-1">C++的情况 <a class="header-anchor" href="#c-的情况" aria-hidden="true">#</a></h3><p>C++把内存使用分为两种情况：值对象和指针对象。值语义的对象超出作用域会自动调用析构函数销毁，传递或者赋值的时候会进行一次拷贝。指针语义则交给人肉来管理，或者使用智能指针来引用计数。值对象在传递赋值中拷贝一次比较浪费，所以C++后来有了移动构造函数。值在移动以后，关联的数据移动到新值。</p><h3 id="rust是怎么做的" tabindex="-1">Rust是怎么做的 <a class="header-anchor" href="#rust是怎么做的" aria-hidden="true">#</a></h3><p>Rust则是在C++的基础上进一步优化。Rust的对象有一个所有者，和多个引用。Rust只允许值有一个所有者，传递和赋值会导致所有权移动。这看起来像C++的 <code>unique_ptr</code>，但实际上更像C++的移动语义。也就是说C++拷贝是隐式的移动是显式的，Rust移动是隐式的。当然Rust在这里有编译器的静态分析，没有运行时开销。很多地方并不想移动值，只是借用一下，Rust也使用了引用的概念，来表达指针语义。一个常见内存问题是指针指向了一个无效的内存地址，Rust却没这个问题。Rust编译器强制让你证明值的生命周期大于它的引用的生命周期。有些编译器搞不清楚的地方需要添加生命周期标记，来告诉编译器。</p><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-hidden="true">#</a></h2><p><a href="https://blog.thoughtram.io/string-vs-str-in-rust/" target="_blank" rel="noreferrer">String vs str in Rust</a></p><p><a href="https://zhuanlan.zhihu.com/p/61652809" target="_blank" rel="noreferrer">知乎专栏：使用套接字联网 API</a></p>`,82),e=[o];function t(c,r,i,C,D,y){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
