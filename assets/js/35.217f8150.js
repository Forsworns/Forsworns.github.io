(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{287:function(e,t,i){"use strict";i.r(t);var n={name:"Timeline",props:{blogs:{type:Array,required:!0},prefix:{type:String,default:""}},methods:{computeLink:e=>e.split("/").join("")+"/"}},r=i(12),l=Object(r.a)(n,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"Timeline"}},e._l(e.blogs,(function(t,n){return i("el-timeline",{key:n},[i("el-timeline-item",{attrs:{timestamp:t.date,placement:"top"}},[i("el-card",[i("router-link",{attrs:{to:""+e.prefix+e.computeLink(t.date)}},[i("h4",[e._v(e._s(t.title))])]),e._v(" "),i("p",[e._v(e._s(t.content))])],1)],1)],1)})),1)}),[],!1,null,"f3a6d6b4",null);t.default=l.exports}}]);