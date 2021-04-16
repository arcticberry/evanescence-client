/*! For license information please see 1.629cca52.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{140:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(141);function n(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(r.a)(e,t):void 0}}},141:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}a.d(t,"a",(function(){return r}))},144:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(140);function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],r=!0,n=!1,c=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(a.push(i.value),!t||a.length!==t);r=!0);}catch(o){n=!0,c=o}finally{try{r||null==s.return||s.return()}finally{if(n)throw c}}return a}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},162:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var r=a(0),n=a.n(r),c=a(23),i=a(189),s=a.n(i),o=a(174),l=a.n(o).a.bind(s.a);function u(e){var t=e.steps;return n.a.createElement("div",{className:s.a.Steps__Wrapper},n.a.createElement("ol",{className:s.a.Steps},t.map((function(e,a){var r=e.label,i=e.href,o=e.active,u=a===t.length-1,p=(t.length,l({Step:!0,Step__Last:u,Step__Current:o}));return n.a.createElement("li",{className:p},n.a.createElement("div",{className:s.a.Step__Milestone},n.a.createElement("i",{className:"mdi mdi-check"})),o?n.a.createElement("span",{className:s.a.Step__Label},r):n.a.createElement(c.b,{to:i,className:s.a.Step__Label},r))}))))}u.defaultProps={steps:[]};var p=u},174:function(e,t,a){var r;!function(){"use strict";var a={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var c=typeof r;if("string"===c||"number"===c)e.push(this&&this[r]||r);else if(Array.isArray(r))e.push(n.apply(this,r));else if("object"===c)if(r.toString===Object.prototype.toString)for(var i in r)a.call(r,i)&&r[i]&&e.push(this&&this[i]||i);else e.push(r.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()},188:function(e,t,a){e.exports={Breadcrumb__Item:"Breadcrumb_Breadcrumb__Item__2Picn",Breadcrumb__Link:"Breadcrumb_Breadcrumb__Link__3Jx1X",Breadcrumb__Link_active:"Breadcrumb_Breadcrumb__Link_active__De8n4"}},189:function(e,t,a){e.exports={Steps__Wrapper:"Steps_Steps__Wrapper__2mfyJ",Steps:"Steps_Steps__3dzmf",Step:"Steps_Step__AbZAt",Step__Milestone:"Steps_Step__Milestone__2lXj2",Step__Current:"Steps_Step__Current__WdK5m",Step__Last:"Steps_Step__Last__1qFK1"}},194:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var r=a(46),n=a(141);var c=a(140);function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=a(32),o=a(144),l=a(0),u=a.n(l),p=a(24),m=a(23),b=a(6),f=a(137),_=Object(l.lazy)((function(){return a.e(12).then(a.bind(null,193))})),d=[{path:"/dashboard/applications/create",label:"Create",Component:_},{path:"/dashboard/applications/create/pick-services",label:"Pick services",exact:!0,Component:Object(l.lazy)((function(){return a.e(8).then(a.bind(null,196))}))},{path:"/dashboard/applications/create/add-keys",label:"Add keys",exact:!0,Component:_}],v=a(160),h=a(66),S=a(48),y=a(47);var j=a(188),E=a.n(j);function O(e){var t=e.items;return u.a.createElement("ol",{className:"breadcrumb"},t.map((function(e,t){var a=e.label,r=e.href,n=e.active,c=n?"active":"";return u.a.createElement("li",{className:"breadcrumb-item ".concat(c," ").concat(E.a.Breadcrumb__Item)},n?u.a.createElement("a",{className:E.a.Breadcrumb__Link_active},a):u.a.createElement(m.b,{to:r,className:E.a.Breadcrumb__Link},a))})))}O.defaultProps={items:[]};var g=O,A=(a(45),a(162),Object(l.lazy)((function(){return Promise.resolve().then(a.bind(null,74))})),{fetchServices:h.b,createApplication:S.a}),k=Object(v.a)(Object(p.b)((function(e){return{services:e.service.services}}),A)((function(e){var t=e.crumbs,a=e.fetchServices,n=e.services,c=(e.createApplication,e.history,"entities"in n?n.entities.services:{}),p=("entities"in n&&n.entities.vendors,u.a.useState({})),_=Object(o.a)(p,2),v=(_[0],_[1]),h=u.a.useState({}),S=Object(o.a)(h,2),j=(S[0],S[1],u.a.useState(0)),E=Object(o.a)(j,2),O=(E[0],E[1],u.a.useState("")),A=Object(o.a)(O,2);A[0],A[1];u.a.useEffect((function(){n.hasOwnProperty("entities")?v(Object(s.a)({},Object.keys(c).reduce((function(e,t){return Object(s.a)(Object(s.a)({},e),{},Object(r.a)({},c[t].id,i(c[t].vendors)))}),{}))):a()}),[n]);return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"container-fluid"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-12 my-3"},u.a.createElement(g,{items:t})))),u.a.createElement(f.c,{initialValues:{applicationName:""}},u.a.createElement(m.a,null,u.a.createElement(l.Suspense,{fallback:function(){return u.a.createElement(u.a.Fragment,null,"Loading...")}},u.a.createElement(b.d,null,u.a.createElement(y.b,{routes:d}),u.a.createElement(b.a,{to:"/dashboard"}))))))})))}}]);
//# sourceMappingURL=1.629cca52.chunk.js.map