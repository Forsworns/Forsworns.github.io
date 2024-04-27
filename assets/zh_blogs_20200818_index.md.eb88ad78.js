import{_ as s,c as e,o as a,e as n}from"./app.e6e0322b.js";const h=JSON.parse('{"title":"想要一只看板娘","description":"基于Vuepress搭建的博客的美化","frontmatter":{"title":"想要一只看板娘","description":"基于Vuepress搭建的博客的美化","tags":["博客搭建","配环境"]},"headers":[],"relativePath":"zh/blogs/20200818/index.md"}'),o={name:"zh/blogs/20200818/index.md"},l=n(`<h1 id="想要一只看板娘" tabindex="-1">想要一只看板娘 <a class="header-anchor" href="#想要一只看板娘" aria-hidden="true">#</a></h1><nav class="table-of-contents"><ul></ul></nav><p>这个博客是用Vuepress搭建的，每次看到别人很好康的博客，就自惭形秽。</p><p>最近在读别人的博客的时候，发现人家也是用的Vuepress，但是里面有看板娘，心动了，我也来试一试。</p><p>调查了一下，这方面集成度比较高的有Vuepress插件<a href="https://github.com/JoeyBling/vuepress-plugin-helper-live2d" target="_blank" rel="noreferrer">vuepress-plugin-helper-live2d</a>。但是该插件仅提供了一个Live2D的模型展示；后面又找了一下，发现之前看到的是<a href="https://github.com/stevenjoezhang/live2d-widget" target="_blank" rel="noreferrer">Live2D Widget</a>这个项目，作者提供了后端可以支持多种模型切换、换装。</p><p>Live2D Widget的默认使用方法很简单，在head里加载上就行了。那么对Vuepress来说，只需要在<a href="https://github.com/Forsworns/blog/tree/master/blog/.vuepress" target="_blank" rel="noreferrer"><code>blog/.vuepress/config.js</code></a>中添加</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> rel</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> href</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">],</span></span>
<span class="line"><span style="color:#F07178;">        [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> src</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">],</span></span>
<span class="line"><span style="color:#F07178;">    }   </span></span>
<span class="line"><span style="color:#F07178;">}</span></span>
<span class="line"></span></code></pre></div><p>现在左下角有了Live2D模型了，虽然没有什么用🙈，但是很好看。</p><p>其实该博客在搭建的时候还是踩了一些坑的，但是因为还在搭建博客……之前就没有写总结，现在又快忘光了。从仅有的<a href="https://github.com/Forsworns/blog" target="_blank" rel="noreferrer">README</a>和代码中，我之前是给每个页面单独定义过<a href="https://github.com/Forsworns/blog/tree/master/blog/.vuepress" target="_blank" rel="noreferrer">Layout组件</a>的（见<code>blog/.vuepress/components/*Layout.vue</code>）。之后有空去考虑只在BlogLayout.vue中显示看板娘吧，应该可以参考另一篇<a href="https://blog.csdn.net/qq_36357242/article/details/100063063" target="_blank" rel="noreferrer">博文</a>。</p>`,9),p=[l];function t(r,c,F,i,D,y){return a(),e("div",null,p)}const u=s(o,[["render",t]]);export{h as __pageData,u as default};