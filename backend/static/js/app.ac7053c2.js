(function(e){function a(a){for(var n,l,i=a[0],y=a[1],s=a[2],u=0,d=[];u<i.length;u++)l=i[u],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(n in y)Object.prototype.hasOwnProperty.call(y,n)&&(e[n]=y[n]);c&&c(a);while(d.length)d.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],n=!0,l=1;l<t.length;l++){var y=t[l];0!==r[y]&&(n=!1)}n&&(o.splice(a--,1),e=i(i.s=t[0]))}return e}var n={},r={app:0},o=[];function l(e){return i.p+"../static/js/"+({about:"about"}[e]||e)+"."+{about:"6ff9826a"}[e]+".js"}function i(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var a=[],t=r[e];if(0!==t)if(t)a.push(t[2]);else{var n=new Promise((function(a,n){t=r[e]=[a,n]}));a.push(t[2]=n);var o,y=document.createElement("script");y.charset="utf-8",y.timeout=120,i.nc&&y.setAttribute("nonce",i.nc),y.src=l(e);var s=new Error;o=function(a){y.onerror=y.onload=null,clearTimeout(u);var t=r[e];if(0!==t){if(t){var n=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;s.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,t[1](s)}r[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:y})}),12e4);y.onerror=y.onload=o,document.head.appendChild(y)}return Promise.all(a)},i.m=e,i.c=n,i.d=function(e,a,t){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)i.d(t,n,function(a){return e[a]}.bind(null,n));return t},i.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="/",i.oe=function(e){throw console.error(e),e};var y=window["webpackJsonp"]=window["webpackJsonp"]||[],s=y.push.bind(y);y.push=a,y=y.slice();for(var u=0;u<y.length;u++)a(y[u]);var c=s;o.push([0,"chunk-vendors"]),t()})({0:function(e,a,t){e.exports=t("56d7")},"034f":function(e,a,t){"use strict";var n=t("85ec"),r=t.n(n);r.a},"56d7":function(e,a,t){"use strict";t.r(a);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("div",{attrs:{id:"nav"}},[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/log"}},[e._v("Log")])],1),t("router-view")],1)},o=[],l=(t("034f"),t("2877")),i={},y=Object(l["a"])(i,r,o,!1,null,null,null),s=y.exports,u=(t("d3b7"),t("8c4f")),c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"home"},[t("el-row",{attrs:{type:"flex",justify:"center"}},[t("el-col",[t("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"Select Basic Date","picker-options":e.pickerOptions},model:{value:e.date,callback:function(a){e.date=a},expression:"date"}}),t("el-button",{on:{click:e.get_charts}},[e._v("Get charts!")])],1),t("el-col",{attrs:{span:10}},[t("el-input",{attrs:{placeholder:"Leaklevel Threshold",type:"number",maxlength:"7"},model:{value:e.input_Leaklevel,callback:function(a){e.input_Leaklevel=a},expression:"input_Leaklevel"}},[t("template",{slot:"prepend"},[e._v("Leaklevel Threshold")])],2)],1),t("el-col",{attrs:{span:10}},[t("el-input",{attrs:{placeholder:"Frequency Threshold",type:"number",maxlength:"7"},model:{value:e.input_Frequency,callback:function(a){e.input_Frequency=a},expression:"input_Frequency"}},[t("template",{slot:"prepend"},[e._v("Frequency Threshold")])],2)],1),t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:e.edit_threshold}},[e._v("Edit Threshold")])],1)],1),t("el-divider"),t("el-row",{attrs:{type:"flex",justify:"center"}},[t("el-col",{attrs:{span:16}},[t("div",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"frequency"}})]),t("el-col",{attrs:{span:8}},[t("div",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"frequency_histogram"}})])],1),t("el-row",{attrs:{type:"flex",justify:"center"}},[t("el-col",{attrs:{span:16}},[t("div",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"leaklevel"}})]),t("el-col",{attrs:{span:8}},[t("div",{staticStyle:{height:"400px",width:"100%"},attrs:{id:"leaklevel_histogram"}})])],1)],1)},d=[],p=t("2909"),D=(t("96cf"),t("1da1"));t("b680");function h(e){var a=t("313e"),n=a.init(document.getElementById("leaklevel")),r=Math.min.apply(Math,Object(p["a"])(e))-.1;n.setOption({title:{text:"LeakLevel: Three Day Prediction"},tooltip:{trigger:"axis"},legend:{data:["Leak level"]},xAxis:{type:"category",boundaryGap:!1,data:["Day-1-05:00","Day-1-05:30","Day-1-06:00","Day-1-06:30","Day-1-07:00","Day-1-07:30","Day-1-08:00","Day-1-08:30","Day-1-09:00","Day-1-09:30","Day-1-10:00","Day-1-10:30","Day-1-11:00","Day-1-11:30","Day-1-12:00","Day-1-12:30","Day-1-13:00","Day-1-13:30","Day-1-14:00","Day-1-14:30","Day-1-15:00","Day-1-15:30","Day-1-16:00","Day-1-16:30","Day-1-17:00","Day-1-17:30","Day-1-18:00","Day-2-05:00","Day-2-05:30","Day-2-06:00","Day-2-06:30","Day-2-07:00","Day-2-07:30","Day-2-08:00","Day-2-08:30","Day-2-09:00","Day-2-09:30","Day-2-10:00","Day-2-10:30","Day-2-11:00","Day-2-11:30","Day-2-12:00","Day-2-12:30","Day-2-13:00","Day-2-13:30","Day-2-14:00","Day-2-14:30","Day-2-15:00","Day-2-15:30","Day-2-16:00","Day-2-16:30","Day-2-17:00","Day-2-17:30","Day-2-18:00","Day-3-05:00","Day-3-05:30","Day-3-06:00","Day-3-06:30","Day-3-07:00","Day-3-07:30","Day-3-08:00","Day-3-08:30","Day-3-09:00","Day-3-09:30","Day-3-10:00","Day-3-10:30","Day-3-11:00","Day-3-11:30","Day-3-12:00","Day-3-12:30","Day-3-13:00","Day-3-13:30","Day-3-14:00","Day-3-14:30","Day-3-15:00","Day-3-15:30","Day-3-16:00","Day-3-16:30","Day-3-17:00","Day-3-17:30","Day-3-18:00"],axisLabel:{rotate:30}},yAxis:{x:"center",type:"value",min:r.toFixed(1)},series:[{name:"Leak level",type:"line",data:e}]})}function f(e){var a=t("313e"),n=a.init(document.getElementById("leaklevel_histogram")),r=Math.min.apply(Math,Object(p["a"])(e))-.1;n.setOption({title:{text:"Leaklevel Histogram"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",boundaryGap:!0,data:["min","Q1","median","mean","Q3","max"]},yAxis:{type:"value",min:r.toFixed(1)},series:[{name:"Leak level",type:"bar",barWidth:30,data:e,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:16}}}}}]})}function m(e){var a=t("313e"),n=a.init(document.getElementById("frequency_histogram")),r=Math.min.apply(Math,Object(p["a"])(e))-.1;n.setOption({title:{text:"Frequency Histogram"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},xAxis:{type:"category",boundaryGap:!0,data:["min","Q1","median","mean","Q3","max"]},yAxis:{type:"value",min:r.toFixed(1)},series:[{name:"Frequency level",type:"bar",barWidth:30,data:e,itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"black",fontSize:16}}}}}]})}function v(e){var a=t("313e"),n=a.init(document.getElementById("frequency")),r=Math.min.apply(Math,Object(p["a"])(e))-.1;n.setOption({title:{text:"Frequency: Three Day Prediction"},tooltip:{trigger:"axis"},legend:{data:["Frequency"]},xAxis:{type:"category",boundaryGap:!1,data:["Day-1-05:00","Day-1-05:30","Day-1-06:00","Day-1-06:30","Day-1-07:00","Day-1-07:30","Day-1-08:00","Day-1-08:30","Day-1-09:00","Day-1-09:30","Day-1-10:00","Day-1-10:30","Day-1-11:00","Day-1-11:30","Day-1-12:00","Day-1-12:30","Day-1-13:00","Day-1-13:30","Day-1-14:00","Day-1-14:30","Day-1-15:00","Day-1-15:30","Day-1-16:00","Day-1-16:30","Day-1-17:00","Day-1-17:30","Day-1-18:00","Day-2-05:00","Day-2-05:30","Day-2-06:00","Day-2-06:30","Day-2-07:00","Day-2-07:30","Day-2-08:00","Day-2-08:30","Day-2-09:00","Day-2-09:30","Day-2-10:00","Day-2-10:30","Day-2-11:00","Day-2-11:30","Day-2-12:00","Day-2-12:30","Day-2-13:00","Day-2-13:30","Day-2-14:00","Day-2-14:30","Day-2-15:00","Day-2-15:30","Day-2-16:00","Day-2-16:30","Day-2-17:00","Day-2-17:30","Day-2-18:00","Day-3-05:00","Day-3-05:30","Day-3-06:00","Day-3-06:30","Day-3-07:00","Day-3-07:30","Day-3-08:00","Day-3-08:30","Day-3-09:00","Day-3-09:30","Day-3-10:00","Day-3-10:30","Day-3-11:00","Day-3-11:30","Day-3-12:00","Day-3-12:30","Day-3-13:00","Day-3-13:30","Day-3-14:00","Day-3-14:30","Day-3-15:00","Day-3-15:30","Day-3-16:00","Day-3-16:30","Day-3-17:00","Day-3-17:30","Day-3-18:00"],axisLabel:{rotate:30}},yAxis:{x:"center",type:"value",min:r.toFixed(1)},series:[{name:"Frequency",type:"line",data:e}]})}var g={name:"Home",data:function(){return{pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},date:"",input_Leaklevel:"",input_Frequency:""}},methods:{get_charts:function(){var e=this;if(""===this.date||null===this.date)this.$message.error("You need select date!");else{var a=this.date.getFullYear(),t=this.date.getMonth()+1,n=this.date.getDate();t<10&&(t="0"+t),n<10&&(n="0"+n);var r=a+"-"+t+"-"+n;this.$axios({method:"post",url:"/api/",data:{date:r}}).then(function(){var a=Object(D["a"])(regeneratorRuntime.mark((function a(t){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(200!==t.data.code){a.next=18;break}if(e.$message({message:"Successfully get data!",type:"success",showClose:!0,duration:1e3}),e.input_Leaklevel=t.data.data.leaklevel_threshold,e.input_Frequency=t.data.data.frequency_threshold,v(t.data.data.frequency),h(t.data.data.leaklevel),m(t.data.data.freq_static),f(t.data.data.leak_static),!(Math.max.apply(Math,Object(p["a"])(t.data.data.leaklevel))>=t.data.data.leaklevel_threshold)){a.next=11;break}return a.next=11,e.$notify({title:"Warning",message:"Leak Level exceeds the alert number("+t.data.data.leaklevel_threshold+")! It is "+Math.max.apply(Math,Object(p["a"])(t.data.data.leaklevel)),type:"warning",duration:0});case 11:if(!(Math.max.apply(Math,Object(p["a"])(t.data.data.frequency))>t.data.data.frequency_threshold)){a.next=16;break}return console.log("Math.max(...res.data.data.frequency) : "+Math.max.apply(Math,Object(p["a"])(t.data.data.frequency))),console.log("res.data.data.frequency_threshold : "+t.data.data.frequency_threshold),a.next=16,e.$notify({title:"Warning",message:"Frequency exceeds the alert number("+t.data.data.frequency_threshold+")! It is "+Math.max.apply(Math,Object(p["a"])(t.data.data.frequency)),type:"warning",duration:0});case 16:a.next=19;break;case 18:e.$message.error("Unable get data == "+t.data.msg);case 19:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())}},edit_threshold:function(){var e=this;""===this.input_Leaklevel||""===this.input_Frequency?this.$notify.error({title:"Warning",message:"Please input leaklevel threshold and frequency threshold!",duration:2e3}):this.$axios({method:"post",url:"/api/edit_threshold",data:{frequency:parseFloat(this.input_Frequency),leaklevel:parseFloat(this.input_Leaklevel)}}).then((function(a){200===a.data.code?e.$message({message:"Successfully edit threshold! Please refresh the page",type:"success",showClose:!0,duration:2e3}):e.$message({message:"Failed to edit threshold!Please check your input",type:"error",showClose:!0,duration:2e3})}))}}},x=g,b=Object(l["a"])(x,c,d,!1,null,null,null),k=b.exports;n["default"].use(u["a"]);var _=[{path:"/",name:"Home",component:k},{path:"/log",name:"Log",component:function(){return t.e("about").then(t.bind(null,"f836"))}}],w=new u["a"]({mode:"history",base:"/",routes:_}),q=w,O=t("2f62");n["default"].use(O["a"]);var j=new O["a"].Store({state:{},mutations:{},actions:{},modules:{}}),F=t("bc3a"),M=t.n(F),L=t("5c96"),S=t.n(L),P=(t("0fae"),t("fcff")),T=t.n(P);n["default"].use(S.a,{locale:T.a}),M.a.defaults.headers.post["Content-Type"]="application/json;charset=UTF-8",M.a.defaults.timeout=1e4,n["default"].prototype.$axios=M.a,n["default"].config.productionTip=!1,new n["default"]({router:q,store:j,render:function(e){return e(s)}}).$mount("#app")},"85ec":function(e,a,t){}});
//# sourceMappingURL=app.ac7053c2.js.map