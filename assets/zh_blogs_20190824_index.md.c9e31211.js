import{_ as s,c as a,o as n,e as o}from"./app.0f5a0ae1.js";const l="/assets/angry.66b757a0.jpg",u=JSON.parse('{"title":"Anaconda中的cudnn版本问题","description":"Loaded runtime CuDNN library：7.1.4 but source was compiled with：7.4.1","frontmatter":{"title":"Anaconda中的cudnn版本问题","description":"Loaded runtime CuDNN library：7.1.4 but source was compiled with：7.4.1","tags":["配环境"]},"headers":[{"level":2,"title":"错误信息","slug":"错误信息","link":"#错误信息","children":[]},{"level":2,"title":"逃避虽可耻但有用","slug":"逃避虽可耻但有用","link":"#逃避虽可耻但有用","children":[]},{"level":2,"title":"一个完美的解决方案","slug":"一个完美的解决方案","link":"#一个完美的解决方案","children":[]},{"level":2,"title":"后记","slug":"后记","link":"#后记","children":[]}],"relativePath":"zh/blogs/20190824/index.md"}'),e={name:"zh/blogs/20190824/index.md"},p=o(`<h1 id="anaconda中的cudnn版本问题" tabindex="-1">Anaconda中的cudnn版本问题 <a class="header-anchor" href="#anaconda中的cudnn版本问题" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul><li><a href="#错误信息">错误信息</a></li><li><a href="#逃避虽可耻但有用">逃避虽可耻但有用</a></li><li><a href="#一个完美的解决方案">一个完美的解决方案</a></li><li><a href="#后记">后记</a></li></ul></nav><h2 id="错误信息" tabindex="-1">错误信息 <a class="header-anchor" href="#错误信息" aria-hidden="true">#</a></h2><p>今天想更新一下win10电脑上的tensorflow和keras，结果就收到了报错：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">Loaded</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">runtime</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CuDNN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">library:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7.1.4</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">but</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">was</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compiled</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">with:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7.4.1.</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">CuDNN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">library</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">major</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">minor</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">needs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">match</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">have</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">higher</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">minor</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">case</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CuDNN</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">7.0</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">later</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version.</span></span>
<span class="line"><span style="color:#FFCB6B;">If</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">using</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">binary</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">upgrade</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">your</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">CuDNN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">library.</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">If</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">building</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sources,</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">sure</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">library</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">loaded</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">at</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">runtime</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compatible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">with</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">version</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">specified</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">during</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">compile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">configuration.</span></span>
<span class="line"></span></code></pre></div><p>很自然得升级了cudnn，但是错误没有解决，折腾了好久反复升降级</p><p><img src="`+l+'" alt=""></p><h2 id="逃避虽可耻但有用" tabindex="-1">逃避虽可耻但有用 <a class="header-anchor" href="#逃避虽可耻但有用" aria-hidden="true">#</a></h2><p>最后在崩溃边缘发现了原来是一直在使用Anaconda中的cudnn，目录在<code>\\anaconda\\pkgs\\cudnn-7.1.4-cuda9.0_0\\Library</code>或<code>\\anaconda\\envs\\xxx\\Library</code>，但是anaconda那里又没有办法拿到7.4.1的<code>cudnn</code>更新……遂选择了暂时放弃，回退<code>tensorflow-gpu 1.10</code>。</p><h2 id="一个完美的解决方案" tabindex="-1">一个完美的解决方案 <a class="header-anchor" href="#一个完美的解决方案" aria-hidden="true">#</a></h2><p>发现了一篇很好的<a href="https://blog.csdn.net/Tilamy/article/details/88616201" target="_blank" rel="noreferrer">博客</a>，按照博主的做法，我成功更新了环境。为扩散和防止链接失效，这里重述一下：</p><p>博主提到可以到<a href="https://anaconda.org/anaconda/cudnn/files" target="_blank" rel="noreferrer">Anaconda官网</a>那里去下载所需的版本然后手动对上面提到的文件夹内容进行覆盖。但是Anaconda并没有提供<code>cudnn7.4.1</code> 。我直接试着将从英伟达官网下载的<code>cudnn7.4.1</code>文件(<code>bin\\cudnn64_7.dll</code>,<code>lib\\x64\\cudnn.lib</code>,<code>include\\cudnn.h</code>)，覆盖到了<code>\\anaconda\\pkgs\\cudnn-7.1.4-cuda9.0_0\\Library</code>和<code>\\anaconda\\envs\\xxx\\Library</code>下对应文件。这个时候跑通了！🎉</p><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-hidden="true">#</a></h2><p>本来还好奇我明明下载的是<code>cuda 10.0</code>对应的<code>cudnn 7.4.1</code>，而在<code>Anaconda</code>目录下覆盖的文件夹名称里含有<code>cuda 9.0</code>，竟然还能使用。后来才发现 <code>Anaconda</code>自身提供了9.0和10.0两个版本的<code>cuda</code>……估计根本没有用系统中安装的英伟达套件。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>用<code>conda</code>升级库的时候还是要小心的，不要随便手动指定版本。</p></div>',15),c=[p];function r(t,C,d,y,A,i){return n(),a("div",null,c)}const h=s(e,[["render",r]]);export{u as __pageData,h as default};