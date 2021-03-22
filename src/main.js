// node_module 需先排於前面 沒有.屬外部資源
import Vue from 'vue';
import 'bootstrap'; // 導入Bootstrap JS
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { // 驗證套件
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案

import App from './App.vue';
import router from './router';
import Pagination from './components/Pagination.vue';
import currencyFilter from './filters/currency'; // filter 千分位

Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;

// pagination元件，全域註冊
Vue.component('pagination', Pagination);

// Loading元件，全域註冊
Vue.component('Loading', Loading);

// 套件加入vue 藍圖內(原型)
Vue.use(VueAxios, axios);

// Even Bus
Vue.prototype.$bus = new Vue();

// vee-validate 所有驗證規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 自定義設定檔案，錯誤的 className
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 載入自訂規則包
localize('tw', zhTW); // 中文語系

// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', ValidationObserver);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
