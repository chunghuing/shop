(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21493393"],{"25a9":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-hover"},[t._m(1),a("tbody",t._l(t.orders,(function(e,s){return a("tr",{key:e.id},[a("th",{attrs:{scope:"row"}},[t._v(t._s(s+1))]),a("td",[t._v(t._s(e.created.datetime))]),a("td",[a("ul",{staticClass:"list-unstyled"},t._l(e.products,(function(e,s){return a("li",{key:s},[t._v(" "+t._s(e.product.title)+" 數量："+t._s(e.quantity)+" "+t._s(e.product.unit)+" ")])})),0)]),a("td",[t._v(" "+t._s(e.payment)+" ")]),a("td",{staticClass:"text-right"},[t._v(" "+t._s(e.amount)+" ")]),a("td",[a("div",{staticClass:"custom-control custom-switch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.paid,expression:"item.paid"}],staticClass:"custom-control-input",attrs:{id:e.id,type:"checkbox"},domProps:{checked:Array.isArray(e.paid)?t._i(e.paid,null)>-1:e.paid},on:{change:[function(a){var s=e.paid,c=a.target,i=!!c.checked;if(Array.isArray(s)){var r=null,n=t._i(s,r);c.checked?n<0&&t.$set(e,"paid",s.concat([r])):n>-1&&t.$set(e,"paid",s.slice(0,n).concat(s.slice(n+1)))}else t.$set(e,"paid",i)},function(a){return t.setOrderPaid(e)}]}}),a("label",{staticClass:"custom-control-label",attrs:{for:e.id}},[e.paid?a("strong",{staticClass:"text-success"},[t._v(" 已付款 ")]):a("span",{staticClass:"text-muted"},[t._v(" 尚未付款 ")])])])])])})),0)]),a("Pagination",{attrs:{pages:t.pagination},on:{"emit-pages":t.getOrders}})],1)])])},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex mb-2"},[a("h1",{staticClass:"h5 mr-auto font-weight-bold"},[t._v("訂單列表")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("#")]),a("th",{attrs:{scope:"col"}},[t._v("下單時間")]),a("th",{attrs:{scope:"col"}},[t._v("購買款項")]),a("th",{attrs:{scope:"col"}},[t._v("付款方式")]),a("th",{attrs:{scope:"col"}},[t._v("應付金額")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("是否付款")])])])}],i=(a("99af"),a("1799")),r={name:"Order",components:{Pagination:i["a"]},data:function(){return{orders:{},pagination:{}}},created:function(){this.getOrders()},methods:{getOrders:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/admin/ec/orders?page=").concat(e,"&paged=10");this.$http.get(a).then((function(e){t.orders=e.data.data,t.pagination=e.data.meta.pagination}))},setOrderPaid:function(t){var e=this,a="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/admin/ec/orders/").concat(t.id,"/paid"),s='已修改為 "已付款" ヽ(＾Д＾)ﾉ ';t.paid||(a="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/admin/ec/orders/").concat(t.id,"/unpaid"),s='已修改為 "尚未付款" ヽ(＾Д＾)ﾉ '),this.$http.patch(a,t.id).then((function(){e.$bus.$emit("message:push",s,"success"),e.getOrders()}))}}},n=r,o=a("2877"),d=Object(o["a"])(n,s,c,!1,null,null,null);e["default"]=d.exports},8418:function(t,e,a){"use strict";var s=a("c04e"),c=a("9bf2"),i=a("5c6c");t.exports=function(t,e,a){var r=s(e);r in t?c.f(t,r,i(0,a)):t[r]=a}},"99af":function(t,e,a){"use strict";var s=a("23e7"),c=a("d039"),i=a("e8b5"),r=a("861d"),n=a("7b0b"),o=a("50c4"),d=a("8418"),l=a("65f0"),u=a("1dde"),p=a("b622"),h=a("2d00"),f=p("isConcatSpreadable"),v=9007199254740991,m="Maximum allowed index exceeded",_=h>=51||!c((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),g=u("concat"),b=function(t){if(!r(t))return!1;var e=t[f];return void 0!==e?!!e:i(t)},x=!_||!g;s({target:"Array",proto:!0,forced:x},{concat:function(t){var e,a,s,c,i,r=n(this),u=l(r,0),p=0;for(e=-1,s=arguments.length;e<s;e++)if(i=-1===e?r:arguments[e],b(i)){if(c=o(i.length),p+c>v)throw TypeError(m);for(a=0;a<c;a++,p++)a in i&&d(u,p,i[a])}else{if(p>=v)throw TypeError(m);d(u,p++,i)}return u.length=p,u}})}}]);
//# sourceMappingURL=chunk-21493393.787f8747.js.map