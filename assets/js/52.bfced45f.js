(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{464:function(t,s,e){"use strict";e.r(s);var n=e(12),a=Object(n.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"想要一只看板娘"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#想要一只看板娘"}},[t._v("#")]),t._v(" 想要一只看板娘")]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul")]),e("p"),t._v(" "),e("p",[t._v("这个博客是用Vuepress搭建的，每次看到别人很好康的博客，就自惭形秽。")]),t._v(" "),e("p",[t._v("最近在读别人的博客的时候，发现人家也是用的Vuepress，但是里面有看板娘，心动了，我也来试一试。")]),t._v(" "),e("p",[t._v("调查了一下，这方面集成度比较高的有Vuepress插件"),e("a",{attrs:{href:"https://github.com/JoeyBling/vuepress-plugin-helper-live2d",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuepress-plugin-helper-live2d"),e("OutboundLink")],1),t._v("。但是该插件仅提供了一个Live2D的模型展示；后面又找了一下，发现之前看到的是"),e("a",{attrs:{href:"https://github.com/stevenjoezhang/live2d-widget",target:"_blank",rel:"noopener noreferrer"}},[t._v("Live2D Widget"),e("OutboundLink")],1),t._v("这个项目，作者提供了后端可以支持多种模型切换、换装。")]),t._v(" "),e("p",[t._v("Live2D Widget的默认使用方法很简单，在head里加载上就行了。那么对Vuepress来说，只需要在"),e("a",{attrs:{href:"https://github.com/Forsworns/blog/tree/master/blog/.vuepress",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("blog/.vuepress/config.js")]),e("OutboundLink")],1),t._v("中添加")]),t._v(" "),e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[t._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\thead"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'link'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" rel"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"stylesheet"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" href"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" src"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("   \n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("现在左下角有了Live2D模型了，虽然没有什么用🙈，但是很好看。")]),t._v(" "),e("p",[t._v("其实该博客在搭建的时候还是踩了一些坑的，但是因为还在搭建博客……之前就没有写总结，现在又快忘光了。从仅有的"),e("a",{attrs:{href:"https://github.com/Forsworns/blog",target:"_blank",rel:"noopener noreferrer"}},[t._v("README"),e("OutboundLink")],1),t._v("和代码中，我之前是给每个页面单独定义过"),e("a",{attrs:{href:"https://github.com/Forsworns/blog/tree/master/blog/.vuepress",target:"_blank",rel:"noopener noreferrer"}},[t._v("Layout组件"),e("OutboundLink")],1),t._v("的（见"),e("code",[t._v("blog/.vuepress/components/*Layout.vue")]),t._v("）。之后有空去考虑只在BlogLayout.vue中显示看板娘吧，应该可以参考另一篇"),e("a",{attrs:{href:"https://blog.csdn.net/qq_36357242/article/details/100063063",target:"_blank",rel:"noopener noreferrer"}},[t._v("博文"),e("OutboundLink")],1),t._v("。")]),t._v(" "),e("p",[e("RouterLink",{attrs:{to:"/zh/blogs/"}},[t._v("返回")])],1),t._v(" "),e("Comment",{attrs:{lang:"zh-CN"}})],1)}),[],!1,null,null,null);s.default=a.exports}}]);