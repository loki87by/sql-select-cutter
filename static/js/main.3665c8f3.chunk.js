(this["webpackJsonpsql-select-cutter"]=this["webpackJsonpsql-select-cutter"]||[]).push([[0],[,,,,,,,,,function(e,t,n){},,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),l=n(4),s=n.n(l),i=(n(9),n(2));function r(e){const t=e.replace(/( +)|(\n+)/g,((e,t,n)=>t?" ":n?", ":e));let n=[],c="",a=!1,l=!1;for(let s=0;s<t.length;s++)"<"===t[s]?a=!0:">"===t[s]?a=!1:'"'!==t[s]||a?","!==t[s]||a||l?c+=t[s]:(n.push(c),c=""):l=!l;return n.push(c),n.map((e=>""===e.trim()?null:e.trim()))}function o(e,t){return e.map(((e,n)=>t.includes(n)?e:null)).filter((e=>null!==e))}var u=n.p+"static/media/copy.067cf7a4.svg",j=(n(12),n(0));var h=function(e){const[t,n]=Object(c.useState)(!1),a="".concat("SELECT column_name\nFROM USER_TAB_COLUMNS\nWHERE table_name = "," ").concat(e.data.table,";"),l=Object(i.useClipboard)({onError(){alert("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")},copiedTimeout:3e3});return t?Object(j.jsx)("p",{children:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u043d\u044f\u0442\u044b"}):Object(j.jsxs)("section",{children:[Object(j.jsx)("p",{children:"\u0421\u043a\u043e\u043f\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u043a\u043e\u0434:"}),Object(j.jsx)("code",{children:a}),Object(j.jsxs)("article",{children:[Object(j.jsx)("img",{src:u,alt:"\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c",onClick:function(){l.copy(a)}}),Object(j.jsx)("p",{children:"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u043e\u0434"})]}),Object(j.jsx)("p",{children:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0435\u0433\u043e \u0432 \u0441\u0432\u043e\u044e IDE \u0438 \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u0435"}),Object(j.jsxs)("article",{children:[Object(j.jsx)("label",{htmlFor:"alias_".concat(e.index,"_input"),children:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u0430)"}),Object(j.jsx)("input",{type:"text",id:"alias_".concat(e.index,"_input"),name:"alias_".concat(e.index,"_input"),placeholder:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",value:"",onChange:t=>function(t){const c=e.aliases.slice();c.push({data:r(t),alias:e.data.alias}),n(!0),e.setAliases(c)}(t.target.value)})]})]})};n(14);var p=function(e){const t=Object(i.useClipboard)({onError(){alert("\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")},copiedTimeout:3e3});return Object(j.jsx)("table",{children:Object(j.jsx)("tbody",{children:e.data.map(((n,c)=>Object(j.jsx)("tr",{children:n.map(((n,a)=>Object(j.jsxs)("td",{title:1===c?"\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u0441\u0442\u043e\u043b\u0431\u0446\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440":"",children:[n,0===c?Object(j.jsx)("img",{src:u,alt:"\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c",onClick:()=>{!function(n){let c="";e.data.forEach(((a,l)=>{0===l?c="".concat(a[n],": "):l===e.data.length-1?c+="".concat(a[n],"."):c+="".concat(a[n],", "),t.copy(c)}))}(a)}}):""]},"cell-".concat(a))))},"row-".concat(c))))})})};n(15),n(16);var d=function(){const[e,t]=Object(c.useState)(!1),[n,a]=Object(c.useState)(!1),[l,s]=Object(c.useState)([]),[i,u]=Object(c.useState)([]),[d,b]=Object(c.useState)([]),[O,f]=Object(c.useState)(""),[g,x]=Object(c.useState)(""),[m,S]=Object(c.useState)(!1),[_,v]=Object(c.useState)([]),[C,E]=Object(c.useState)([]);return Object(c.useEffect)((()=>{if(_.length===C.length){const e=g.replace(/\S+\.\*/gi,(e=>{const t=e.replace(/\.\*$/,""),n=_.find((e=>e.alias===t));return C.find((e=>e.alias===t)).data.map((e=>"".concat(n,".").concat(e)))}));let t=[...e.toLowerCase().replace(/select\s*/,"").replace(/\s*from\s[\s\S]*/,"").replace(/( +)|(\n)/g,((e,t,n)=>t?" ":n?"\n":e)).split(/,\s/g).map((e=>e.replace(/^\S*\s/,"")))];s(t)}}),[_.length,C.length,g,_,C]),e?Object(j.jsx)(p,{data:i}):Object(j.jsx)("section",{children:n?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("p",{children:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u043d\u044f\u0442\u044b"}),m?Object(j.jsx)("p",{children:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u043d\u044f\u0442\u044b"}):Object(j.jsxs)("article",{children:[Object(j.jsx)("label",{htmlFor:"names_input",children:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 SQL-\u0437\u0430\u043f\u0440\u043e\u0441"}),Object(j.jsx)("input",{type:"text",id:"names_input",name:"names_input",placeholder:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0438\u043c\u0435\u043d\u0430 \u0441\u0442\u043e\u043b\u0431\u0446\u043e\u0432",value:g,onChange:function(e){const t=e.target.value;x(t),function(e){const t=e.match(/\S+\.\*/gi),n=e.toUpperCase().replace(/(\S+\s)*FROM/,""),c=t.map((e=>{const t=e.replace(/\.\*$/,""),c=n.split(" "),a=c.findIndex((e=>e===t));return{table:c[a-1],alias:t}}));v(c)}(t),S(!0)}})]}),_.length>0?_.map(((e,t)=>Object(j.jsx)(h,{data:e,index:t,aliases:C,setAliases:E},"alias-".concat(t)))):"",Object(j.jsx)("button",{className:"main_button",disabled:_.length!==C.length,onClick:function(){let e=function(e){const t=e[0],n=[];return e.forEach(((c,a)=>{if(a%(l.length-1)===0&&0!==a&&a!==e.length-1){const e=c.slice(0,0-t.length-1),a=c.slice(0-t.length);n.push(e),n.push(a)}else n.push(c)})),n}(d);e=function(e,t){const n=e;let c=[];if(t.length===n)c.push(t);else for(let a=1;a<=t.length/n;a++){const e=[];t.forEach(((t,c)=>{c<n*a&&c>=n*(a-1)&&e.push(t)})),c.push(e)}return c}(l.length,e);const n=[];for(let a=0;a<l.length;a++){let c=[];for(let t=0;t<e.length;t++)c.push(e[t][a]);c.every((e=>null===e||void 0===e||"null"===e))||n.push(a),t(!1)}const c=[o(l,n),...e.map((e=>o(e,n)))];u(c.filter((e=>!e.every((e=>null===e))))),t(!0)},children:"Run"})]}):Object(j.jsxs)("article",{children:[Object(j.jsx)("label",{htmlFor:"data_input",children:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 (\u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0437\u0430\u043f\u0440\u043e\u0441\u0430)"}),Object(j.jsx)("input",{type:"text",id:"data_input",name:"data_input",placeholder:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435",value:O,onChange:e=>function(e){if(!n){const t=r(e);f(e),a(!0),b(t)}}(e.target.value)})]})})};var b=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((t=>{let{getCLS:n,getFID:c,getFCP:a,getLCP:l,getTTFB:s}=t;n(e),c(e),a(e),l(e),s(e)}))};s.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(d,{})}),document.getElementById("root")),b()}],[[17,1,2]]]);
//# sourceMappingURL=main.3665c8f3.chunk.js.map