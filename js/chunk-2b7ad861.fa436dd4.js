(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b7ad861"],{"81b1":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"productsBanner position-relative d-flex align-items-center\njustify-content-center mb-18"}),e("div",{staticClass:"container mt-md-5 mt-3 mb-7"},[e("div",{staticClass:"row"},t._l(t.products,(function(a){return e("div",{key:a.id,staticClass:"col-xl-3 col-md-4 col-12"},[e("div",{staticClass:"card border-0 mb-4 position-relative position-relative"},[e("img",{staticClass:"card-img-top rounded-0",attrs:{src:a.imageUrl[0],alt:"..."}}),e("div",{staticClass:"card-body p-0"},[e("h4",{staticClass:"mb-0 mt-3"},[e("router-link",{attrs:{to:"/product/"+a.id}},[t._v(t._s(a.title))])],1),e("p",{staticClass:"card-text mb-0"},[t._v("NT$1,080 "),e("span",{staticClass:"text-muted "},[e("del",[t._v(t._s(a.origin_price))])])]),e("p",{staticClass:"text-muted mt-3"})])])])})),0),e("pagination",{attrs:{pages:t.pagination},on:{"emit-pages":t.getProducts}})],1)])},i=[],c=(e("99af"),e("1799")),o={name:"Products",components:{Pagination:c["a"]},data:function(){return{products:[],pagination:{}}},created:function(){this.getProducts()},methods:{getProducts:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;console.log("page",a);var e="".concat("https://course-ec-api.hexschool.io","/api/").concat("24e16494-319e-451e-98da-5934151a11a2","/ec/products?page=").concat(a);this.$http.get(e).then((function(a){console.log("getProducts",a),t.products=a.data.data,t.pagination=a.data.meta.pagination}))}}},r=o,s=(e("ac44"),e("2877")),d=Object(s["a"])(r,n,i,!1,null,null,null);a["default"]=d.exports},8418:function(t,a,e){"use strict";var n=e("c04e"),i=e("9bf2"),c=e("5c6c");t.exports=function(t,a,e){var o=n(a);o in t?i.f(t,o,c(0,e)):t[o]=e}},"99af":function(t,a,e){"use strict";var n=e("23e7"),i=e("d039"),c=e("e8b5"),o=e("861d"),r=e("7b0b"),s=e("50c4"),d=e("8418"),u=e("65f0"),l=e("1dde"),p=e("b622"),f=e("2d00"),g=p("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",h=f>=51||!i((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),b=l("concat"),C=function(t){if(!o(t))return!1;var a=t[g];return void 0!==a?!!a:c(t)},x=!h||!b;n({target:"Array",proto:!0,forced:x},{concat:function(t){var a,e,n,i,c,o=r(this),l=u(o,0),p=0;for(a=-1,n=arguments.length;a<n;a++)if(c=-1===a?o:arguments[a],C(c)){if(i=s(c.length),p+i>m)throw TypeError(v);for(e=0;e<i;e++,p++)e in c&&d(l,p,c[e])}else{if(p>=m)throw TypeError(v);d(l,p++,c)}return l.length=p,l}})},ac44:function(t,a,e){"use strict";e("dc16")},dc16:function(t,a,e){}}]);
//# sourceMappingURL=chunk-2b7ad861.fa436dd4.js.map