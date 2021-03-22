<template>
  <div class="mt-6">
    <div class="product container d-flex flex-xl-row">
      <!-- left side -->
      <div class="productImg">
        <div class="imgSize">
          <img :src="product.imageUrl[0]">
          <img :src="product.imageUrl[1]">
          <img :src="product.imageUrl[2]">
          <img :src="product.imageUrl[3]">
          <img :src="product.imageUrl[4]">
        </div>
      </div>
      <!-- right side -->
      <div class="productDetial">
        <div class="text-left">
          <p class="mb-4">{{ product.title }}</p>
          <p>
            <del class="mb-5">NT.{{product.origin_price }}</del>
          </p>
          <p class="mb-5">NT.{{ product.price }}</p>
          <hr>
          <div>
            <div class="countNumber d-flex align-items-center">
              <button class="btn minus" @click="changeQty(-1)">
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="number"
                max="10" min="1"
                class="productNumber"
                v-model="productNum"
                @change="changeNumber(productNum)"
              />
              <button class="btn add" @click="changeQty(1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button type="button" class="btn btn-secondary" @click="updateCart(product,productNum)">
              加入購物車
            </button>
          </div>
          <hr>
          <p>商品描述</p>
          <div>
            *實品顏色依單品照為主<br>
            <div class="mt-3">
              棉 100%<br>
              素材產地 / 中國<br>
              加工產地 / 中國<br>
              前排釦/反面布造型/兩側口袋<br>
            </div>
            <div class="mt-3">
              商品長度/適中<br>
              商品版型/適中<br>
              商品厚薄/適中<br>
              商品彈性/佳<br>
            </div>
            <div class="mt-3">
              *深色布料因穿著時接觸人體溫度及洗滌後有脫色及染劑移染狀況，第一次下水脫色為正常現象。
            </div>
            <div class="mt-3">
              *棉/麻為天然纖維的面料，因吸濕性較一般材質大，故洗滌後些微縮水屬正常現象。
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Product',
  data() {
    return {
      products: [],
      product: {
        imageUrl: [],
      },
      productNum: 1,
    };
  },
  created() {
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=1`;
    this.$http.get(api).then((response) => {
      this.products = response.data.data; // 取得產品列表
    });

    this.getProduct();
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params; // Airbnb es6寫法
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http
        .get(url).then((response) => {
          this.product = response.data.data;
        });
    },
    // 點擊 + - 按鈕做數量判斷
    changeQty(num) {
      const qty = this.productNum + num;
      this.changeNumber(qty);
    },
    // 商品數量欄位變動時判斷
    changeNumber(num) {
      if (num >= 10) {
        this.productNum = 10;
      } else if (num <= 1) {
        this.productNum = 1;
      } else {
        this.productNum = num;
      }
    },
    updateCart(item, quantity) {
      this.$bus.$emit('add-cart', item, quantity);
    },
  },
};
</script>

<style>

.productImg {
  width: calc(100% - 400px);
}

.imgSize {
  width: 600px;
}

.imgSize img {
  width: 100%;
  margin-bottom: 30px;
}

.productDetial {
  max-width: 400px;
}

@media (max-width: 1199.98px) {
  .product {
    flex-direction: column-reverse;
    align-items: center;
  }

  .productImg {
    width: unset;
  }

  .imgSize {
    width: 100%;
  }

  .productDetial {
    max-width: 100%;
    margin-bottom: 30px;
  }
}

</style>
