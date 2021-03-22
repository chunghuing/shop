<template>
  <div>
    <div class="productsBanner position-relative d-flex align-items-center
  justify-content-center mb-18">
    </div>

    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <div class="col-xl-3 col-md-4 col-12" v-for="item in products" :key="item.id">
          <div class="card border-0 mb-4 position-relative position-relative">
            <img :src="item.imageUrl[0]" class="card-img-top rounded-0" alt="...">
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <router-link :to="`/product/${item.id}`">{{ item.title}}</router-link>
              </h4>
              <p class="card-text mb-0">NT$1,080
                <span class="text-muted "><del>{{ item.origin_price }}</del></span></p>
              <p class="text-muted mt-3"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- pagination 元件 -->
      <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      console.log('page', page);

      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(url).then((res) => {
        console.log('getProducts', res);
        this.products = res.data.data; // 取得產品列表
        this.pagination = res.data.meta.pagination; // 取得分頁資訊
      });
    },
  },
};
</script>

<style>

.productsBanner {
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  background-image: url(https://image.mercci22.tw/img/blog/092019/coverrr.jpg);
  background-position: center center;
  background-size: cover;
  opacity: 1;
}

@media (max-width: 1199.98px) {
  .productsBanner {
    background-position: 0%;
  }
}

@media (max-width: 575.98px) {
  .productsBanner {
    background-position: 20%;
  }
}
</style>
