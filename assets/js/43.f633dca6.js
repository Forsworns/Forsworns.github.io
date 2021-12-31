(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{457:function(s,a,t){"use strict";t.r(a);var e=t(12),l=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"使用alias命令接收参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用alias命令接收参数"}},[s._v("#")]),s._v(" 使用Alias命令接收参数")]),s._v(" "),t("p",[s._v("因为实习的缘故，系统得学习了一下shell命令，在练习时，因为每次新建脚本后需要添加执行权限还要用到")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" xxx.sh\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x xxx.sh "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# chmod 777 xxx.sh")]),s._v("\n")])])]),t("p",[s._v("比较麻烦，所以想把上面的命令别名成")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("alias")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("touchs")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"touch '),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v(";chmod +x "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v(';"')]),s._v("\n")])])]),t("p",[s._v("但是执行后，再次执行"),t("code",[s._v("alias")]),s._v("查看更改，发现变成了")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("alias")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("touchs")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'touch ;chmod +x ;'")]),s._v("\n")])])]),t("p",[s._v("以为是双引号的缘故（双引号字符串进行转义且转换参数），换成了")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("alias")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("touchs")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'touch $1;chmod +x $1;'")]),s._v("\n")])])]),t("p",[s._v("但是还是不对，查阅后发现需要使用定义函数的方式曲线救国，这样执行定义的"),t("code",[s._v("touchs")]),s._v("的时候就是在执行一个函数了，那么参数就被传到了函数中（注意函数的参数也是从"),t("code",[s._v("$1")]),s._v("开始的，"),t("code",[s._v("$0")]),s._v("是函数名。")]),s._v(" "),t("p",[s._v("所以正确的方法应该是")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("alias")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("touchs")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'touch_script(){ touch $1;chmod +x $1;};touch_script'")]),s._v("\n")])])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),t("p",[s._v("永久更改需要在"),t("code",[s._v("~/.bashrc")]),s._v("中添加上面的语句。")])]),s._v(" "),t("p",[t("RouterLink",{attrs:{to:"/zh/blogs/"}},[s._v("返回")])],1),s._v(" "),t("Comment",{attrs:{lang:"zh-CN"}})],1)}),[],!1,null,null,null);a.default=l.exports}}]);