<template>
  <div class="container mt-5">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">
          請先登入
      </h1>
      <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input id="inputEmail" v-model="user.email" type="email" class="form-control"
              placeholder="Email address" required autofocus>
      </div>
      <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input id="inputPassword" v-model="user.password" type="password" class="form-control"
              placeholder="Password" required>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
          登入
      </button>
      <br>
      <button class="btn btn-outline-primary btn-block" type="button" @click="signout">
          登出
      </button>
      <br>
      <button class="btn btn-outline-primary btn-block" type="button" @click="getData">
          取得資料
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    // 對應API文件 >> Auth驗證 >> Frontend 前台 - Login. 登入系統
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http.post(api, this.user).then((response) => {
        // console.log(response);
        const { token } = response.data;
        // expired 到期日
        const { expired } = response.data;

        // 儲存 token 跟 expired 到期日
        document.cookie = `token=${token};expires=${new Date(expired * 1000)};`;
        this.$router.push('/admin/');
      }).catch((error) => {
        console.log(error);
      });
    },
    signout() {
      // 請加入 Token
      document.cookie = 'token=; expires=;';
    },
    getData() {
      // 取得 token 的 cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      console.log('token', this.token);

      // API
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      // 將 Token 加入到 Headers 內
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      // 請自行完成 Ajax
      this.$http.get(api).then((res) => {
        // console.log(res);
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
    },
  },
};
</script>
