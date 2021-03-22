<template>
  <div class="mt-3">
    <router-link to="/admin/">後台首頁</router-link> |
    <router-link to="/">回到前台</router-link> |
    <router-link to="/admin/products">products</router-link> |
    <router-link to="/admin/coupon">coupon</router-link> |
    <router-link to="/admin/order">order</router-link> |
    <router-link to="/admin/picture">picture</router-link> |
    <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
      this.$http.post(api, {
        // eslint-disable-next-line
        'api_token': this.token,
      }).then((res) => {
        console.log(res);
        this.checkSuccess = true;
      }).catch((error) => {
        console.log(error.response);
        this.$router.push('/login');
      });
    },
  },
};
</script>
