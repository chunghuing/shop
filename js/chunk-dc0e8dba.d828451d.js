(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc0e8dba"],{1010:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"position-relative d-flex"},[a("div",{staticClass:"container d-flex flex-column bg-white mb-5",staticStyle:{"min-height":"100vh"}},[a("table",{staticClass:"table paymentTable mt-5"},[t._m(0),a("tbody",t._l(t.order.products,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"itemPicture"},[a("img",{staticClass:"img-fluid",attrs:{src:e.product.imageUrl[0]}})]),a("td",[t._v(t._s(e.product.title))]),a("td",{staticClass:"text-center"},[t._v("x"+t._s(e.quantity))]),a("td",{staticClass:"text-right"},[t._v(t._s(t._f("currency")(e.product.price)))])])})),0),a("tfoot",[t.order.coupon?a("tr",[a("td",{staticClass:"text-right py-3",attrs:{colspan:"3"}},[t._v("優惠折抵")]),a("td",{staticClass:"text-right"},[t._v(" - NT "+t._s(t._f("currency")(t.order.amount*(100/t.order.coupon.percent)-t.order.amount*(100/t.order.coupon.percent)*(t.order.coupon.percent/100)))+" ")])]):t._e(),a("tr",[a("td",{staticClass:"text-right",class:{isCoupon:t.order.coupon},attrs:{colspan:"3"}},[t._v("總計")]),a("td",{staticClass:"text-right text-danger",class:{isCoupon:t.order.coupon}},[t._v(" "+t._s(t._f("currency")(t.order.amount))+" ")])])])]),a("table",{staticClass:"table orderOkTable mt-5"},[t._m(1),a("tbody",{staticClass:"text-left"},[a("tr",[a("td",[t._v("RecipientEmail：")]),a("td",[t._v(t._s(t.order.user.email))])]),a("tr",[a("td",{attrs:{width:"150px"}},[t._v("RecipientName：")]),a("td",[t._v(t._s(t.order.user.name))])]),a("tr",[a("td",[t._v("RecipientPhone：")]),a("td",[t._v(t._s(t.order.user.tel))])]),a("tr",[a("td",[t._v("RecipientAddress：")]),a("td",[t._v(t._s(t.order.user.address))])]),a("tr",[a("td",[t._v("Payment：")]),a("td",[t._v(t._s(t.order.payment))])]),a("tr",[a("td",[t._v("message：")]),a("td",[t._v(t._s(t.order.message))])]),a("tr",[a("td",[t._v("payment status：")]),t.order.paid?t._e():a("td",{staticClass:"h5 text-danger"},[t._v("尚未付款")]),t.order.paid?a("td",{staticClass:"h5 text-danger"},[t._v("已付款")]):t._e()])])]),t.order.paid?t._e():a("button",{staticClass:"btn btn-warning d-block mx-auto my-3",attrs:{type:"button"},on:{click:function(e){return t.payOrder()}}},[a("i",{staticClass:"fas fa-clipboard-check"}),t._v(" 確認付款 ")]),a("router-link",{attrs:{to:"/products"}},[t.order.paid?a("button",{staticClass:"btn btn-warning d-block mx-auto my-3",attrs:{type:"button"}},[a("i",{staticClass:"fas fa-couch"}),t._v(" 繼續選購 ")]):t._e()])],1),t._m(2)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{colspan:"4"}},[t._v("購買清單")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{colspan:"2"}},[t._v("訂單資訊")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade",attrs:{id:"paymentModal",tabindex:"-1",role:"dialog"}},[a("div",{staticClass:"modal-dialog modal-sm modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),a("div",{staticClass:"modal-body text-center"},[a("div",{staticClass:"h5 text-secondary font-weight-bold"},[t._v("恭喜您")]),a("div",{staticClass:"h5 text-secondary font-weight-bold"},[t._v("付款成功")])])])])])}],o=(a("99af"),a("1157")),d=a.n(o),i={name:"CheckoutSuccess",data:function(){return{order:{user:{}},orderId:""}},created:function(){this.orderId=this.$route.params.orderId,this.orderId&&this.getDetailed(this.orderId)},methods:{getDetailed:function(t){var e=this,a="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/ec/orders/").concat(t);this.$http.get(a).then((function(t){e.order=t.data.data}))},payOrder:function(){var t=this,e="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/ec/orders/").concat(this.orderId,"/paying");this.$http.post(e).then((function(e){d()("#paymentModal").modal("show"),setTimeout((function(){d()("#paymentModal").modal("hide")}),5e3),e.data.data.paid&&t.getDetailed(t.orderId)}))}}},n=i,c=(a("a997"),a("2877")),l=Object(c["a"])(n,r,s,!1,null,null,null);e["default"]=l.exports},"65b3":function(t,e,a){},8418:function(t,e,a){"use strict";var r=a("c04e"),s=a("9bf2"),o=a("5c6c");t.exports=function(t,e,a){var d=r(e);d in t?s.f(t,d,o(0,a)):t[d]=a}},"99af":function(t,e,a){"use strict";var r=a("23e7"),s=a("d039"),o=a("e8b5"),d=a("861d"),i=a("7b0b"),n=a("50c4"),c=a("8418"),l=a("65f0"),u=a("1dde"),p=a("b622"),h=a("2d00"),_=p("isConcatSpreadable"),f=9007199254740991,m="Maximum allowed index exceeded",v=h>=51||!s((function(){var t=[];return t[_]=!1,t.concat()[0]!==t})),b=u("concat"),C=function(t){if(!d(t))return!1;var e=t[_];return void 0!==e?!!e:o(t)},g=!v||!b;r({target:"Array",proto:!0,forced:g},{concat:function(t){var e,a,r,s,o,d=i(this),u=l(d,0),p=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?d:arguments[e],C(o)){if(s=n(o.length),p+s>f)throw TypeError(m);for(a=0;a<s;a++,p++)a in o&&c(u,p,o[a])}else{if(p>=f)throw TypeError(m);c(u,p++,o)}return u.length=p,u}})},a997:function(t,e,a){"use strict";a("65b3")}}]);
//# sourceMappingURL=chunk-dc0e8dba.d828451d.js.map