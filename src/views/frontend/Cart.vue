<template>
  <div class="container bg-white mb-5">
    <div class="mt-3">
      <h3 class="mt-3 mb-4 pt-3">CHECK ORDER</h3>
      <div class="row">
        <div class="col-xl-8">
          <table class="table table-responsive-sm">
            <thead>
              <tr>
                <th scope="col" class="border-0 pl-0">picture</th>
                <th scope="col" class="border-0 pl-0">product</th>
                <th scope="col" class="border-0">quantity</th>
                <th scope="col" class="border-0">price</th>
                <th scope="col" class="border-0">delete</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-bottom border-top" v-for="item in cart" :key="item.id">
                <td>
                  <img class="cartImg" :src="item.product.imageUrl[0]">
                </td>
                <td>
                  {{item.product.title}}
                </td>
                <td class="border-0 align-middle" style="max-width: 160px;">
                  <div class="input-group pr-5">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-dark border-0 py-2"
                      type="button" id="button-addon1"
                      @click="quantityUpdata(item.product.id, item.quantity - 1)">
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                    <input type="number" max="10" min="1" class="form-control border-0
                      text-center my-auto shadow-none" :value="item.quantity"
                      aria-label="Example text with button addon" aria-describedby="button-addon1"
                      @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                      @change="quantityUpdata(item.product.id, $event.target.value)">
                    <div class="input-group-append">
                      <button class="btn btn-outline-dark border-0 py-2"
                        type="button" id="button-addon2"
                        @click="quantityUpdata(item.product.id, item.quantity + 1)">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="border-0 align-middle">{{item.product.price | currency}}</td>
                <td class="border-0 align-middle" @click="removeCartItem(item.product.id)">
                  <i class="far fa-trash-alt hover"></i>
                </td>
              </tr>

            </tbody>
          </table>

          <div class="input-group w-50 pb-3">
            <input v-model="couponCode"  @keyup.enter="addCoupon" type="text"
            class="form-control rounded-0 border-bottom border-top-0 border-left-0
            border-right-0 shadow-none" placeholder="Coupon Code"
            aria-label="Recipient's username"
            aria-describedby="button-addon2">
            <div class="input-group-append">
              <button @click="addCoupon" :disabled="!couponCode"
              class="btn btn-outline-dark border-bottom border-top-0 border-left-0 border-right-0
              rounded-0" type="button" id="button-addon2">
              <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="border p-4 mb-4">
            <h4 class="font-weight-bold mb-4">Order Detail</h4>
            <table class="table text-muted border-bottom">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                  <td class="text-right border-0 px-0 pt-4">NT {{ cartTotal  | currency}}</td>
                </tr>
                <tr v-if="coupon.enabled">
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">優惠折抵</th>
                  <td class="text-right">
                    - NT {{ cartTotal - cartTotal * (coupon.percent / 100)  | currency}}
                  </td>
                </tr>
                <tr>
                  <th scope="row"
                   class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment
                  </th>
                  <td class="text-right border-0 px-0 pt-0 pb-4">
                    ApplePay
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="coupon.enabled" class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 font-weight-bold">Total</p>
              <p class="mb-0 h4 font-weight-bold">
                NT {{ cartTotal * (coupon.percent / 100)  | currency}}
              </p>
            </div>
            <!-- <button class="btn btn-dark btn-block mt-4" @click="changePage()">
              Order
              <i class="fas fa-shopping-bag"></i>
            </button> -->
            <router-link class="btn btn-dark btn-block mt-4" to="/checkout">
            Order
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      cart: {},
      cartTotal: 0,
      coupon: {},
      couponCode: '',
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        // 購物車金額拉出來重新計算，不然刪除時會出錯造成累加
        this.updateTotal();
      });
    },
    /**
     * 總金額計算
    */
    updateTotal() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    /**
     * 編輯商品數量
    */
    quantityUpdata(id, num) {
      if (num > 10) {
        this.$bus.$emit('message:push', '數量不可超過10喔!', 'info');
      } else if (num < 1) {
        this.$bus.$emit('message:push', '數量不可低於1喔!', 'info');
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

        const data = {
          product: id,
          quantity: num,
        };

        this.$http.patch(url, data).then(() => {
          this.$bus.$emit('nav-getCart');
          this.getCart();
        });
      }
    },
    /**
     * 刪除某一筆購物車資料
    */
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(url).then((response) => {
        console.log(response);
        this.$bus.$emit('nav-getCart');
        this.getCart();
      });
    },
    /**
     * 搜尋此序號是否有coupon
    */
    addCoupon() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;

      const data = {
        code: this.couponCode,
      };

      this.$http.post(url, data).then((response) => {
        this.coupon = response.data.data; // 若 coupon 存在就回寫到 this.coupon
      }).catch((error) => {
        this.$bus.$emit('message:push', `${error.response.data.message}`, 'info');
      });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;

      const order = { ...this.form };

      // coupon.enabled = ture 表示已執行過 addCoupon()，再將 coupon.code 放進 order
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }

      this.$http.post(url, order).then((response) => {
        if (response.data.data.id) {
          this.$router.push(`/Checkout/${response.data.data.id}`);
        }
        this.$bus.$emit('nav-getCart');
      }).catch((error) => {
        const errorData = error.response.data.errors;

        errorData.forEach((err) => {
          this.$bus.$emit('message:push',
            `建立訂單失敗惹，好糗Σ( ° △ °|||)︴
          ${err}`,
            'info');
        });
      });
    },
  },
};

</script>

<style>
.cartImg {
  width: 72px;
  height: 72px;
  object-fit: cover;
}

.hover {
  cursor: pointer;
}
</style>
