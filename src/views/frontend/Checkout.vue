<template>
  <div class="container bg-white my-5">
    <div class="row justify-content-center">
      <!-- cart status -->
      <div class="col-md-10 col-12 cartStatus">
        <ul class=" list-unstyled mb-0 d-flex align-items-center
          justify-content-between w-100 mt-4">
            <li class="mr-md-6 mr-3 position-relative custom-step-line">
              <i class="fas fa-check-circle d-md-inline d-block text-center"></i>
              <span class="text-nowrap"> CHECK ORDER</span>
            </li>
            <li class="mr-md-6 mr-3 position-relative custom-step-line">
              <i class="fas fa-check-circle d-md-inline d-block text-center"></i>
              <span class="text-nowrap"> WRITE ORDER DETAILS</span>
            </li>
            <li><i class="fas fa-dot-circle d-md-inline d-block text-center"></i>
              <span class="text-nowrap"> FINISH ORDER</span>
            </li>
        </ul>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="font-weight-bold mb-4 pt-3">WRITE THE ADD</h3>
      </div>
    </div>

    <div class="row flex-row-reverse justify-content-center pb-5 flex-column">
      <div class="col-xl-4 mb-5">
        <div class="border p-4 mb-4">
          <div v-for="item in cart" :key="item.id" class="d-flex">
            <img :src="item.product.imageUrl[0]" class="mr-2 mb-3 cartImg"/>
            <div class="w-100">
              <div class="d-flex justify-content-between">
                <p class="mb-0 font-weight-bold">{{item.product.title}}</p>
                <p class="mb-0 font-weight-bold">x{{ item.quantity }}</p>
                <p class="mb-0">NT{{item.product.price | currency}}</p>
              </div>
              <!-- <p class="mb-0 font-weight-bold">x1</p> -->
            </div>
          </div>
          <table class="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr v-if="coupon.enabled">
                <td colspan="3" class="text-right py-3">優惠折抵</td>
                <td class="text-right">
                  - NT {{ cartTotal - cartTotal * (coupon.percent / 100)  | currency }}
                </td>
              </tr>
              <tr>
                <th scope="row" :class="{ isCoupon: coupon.enabled }"
                 class="border-0 px-0 pt-4 font-weight-normal">
                 Subtotal
                </th>
                <td v-if="!coupon.enabled" :class="{ isCoupon: coupon.enabled }"
                 class="text-right border-0 px-0 pt-4">
                 NT {{ cartTotal  | currency }}
                </td>
                <td v-if="coupon.enabled" class="text-right text-danger"
                 :class="{ isCoupon: coupon.enabled }">
                 NT {{ cartTotal * (coupon.percent / 100)  | currency}}
                </td>
              </tr>
              <tr>
                <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                <td class="text-right border-0 px-0 pt-0 pb-4">ApplePay</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-between mt-4">
            <p class="mb-0 h4 font-weight-bold" :class="{ isCoupon: coupon.enabled }">
              Total
            </p>
            <p v-if="!coupon.enabled" :class="{ isCoupon: coupon.enabled }"
             class="mb-0 h4 font-weight-bold" >
              NT {{ cartTotal  | currency}}
            </p>
            <p v-if="coupon.enabled" :class="{ isCoupon: coupon.enabled }"
            class="mb-0 h4 font-weight-bold" >
              NT {{ cartTotal * (coupon.percent / 100)  | currency }}
            </p>
          </div>
        </div>
      </div>
<!--  -->
      <div class="col-xl-6">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="createOrder">
            <!-- Email -->
            <div class="form-group mb-0 text-left">
              <validation-provider v-slot="{ errors, classes }" rules="required|email">
                <label for="userEmail" class="text-muted mb-0">
                  Email
                  <span class="text-danger">*</span>
                </label>
                <input type="email" class="form-control" id="userEmail"
                 name="Email" aria-describedby="emailHelp" v-model="form.email"
                 placeholder="example@gmail.com" :class="classes">
                <span v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <!-- Name -->
            <div class="form-group mb-2 text-left">
              <validation-provider v-slot="{ errors, classes }"
               rules="required">
                <label for="userName" class="text-muted mb-0">
                Name
                <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control"
                id="userName" name="姓名" v-model="form.name"
                :class="classes" placeholder="Carmen A. Rose">
                <span v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <!-- Phone -->
            <div class="form-group text-left">
              <validation-provider v-slot="{ errors, classes }"
               rules="required|min:8">
                <label for="usertel" class="text-muted mb-0">
                  Phone
                  <span class="text-danger">*</span>
                </label>
                <input id="usertel" name="Phone" type="tel"
                 class="form-control"  placeholder="0912345678"
                 maxlength="10" v-model="form.tel" :class="classes">
                 <span v-if="errors[0]" class="text-danger">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
            <!-- address -->
            <div class="form-group text-left text-muted">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="userAddress">
                  address
                  <span class="text-danger">*</span>
                </label>
                <input id="userAddress" name="address" v-model="form.address" type="text"
                  placeholder="Please enter the address" class="form-control" :class="classes" />
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- payment -->
            <div class="form-group text-left text-muted">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="payment">
                    payment
                    <span class="text-danger">*</span>
                  </label>
                  <select id="payment" name="payment" v-model="form.payment"
                    class="form-control" :class="classes" >
                    <option value="WebATM">WebATM</option>
                    <option value="ATM">ATM</option>
                    <option value="CVS">CVS</option>
                    <option value="Credit">Credit</option>
                    <option value="ApplePay">ApplePay</option>
                    <option value="GooglePay">GooglePay</option>
                  </select>
                  <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            <!-- Message -->
            <div class="form-group text-left">
              <label for="message" class="text-muted mb-0">
                Message
              </label>
              <textarea class="form-control" id="message"
               name="message" v-model="form.message" cols="10"
               rows="3" placeholder="message ... ">
              </textarea>
            </div>
            <!-- button -->
            <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between
             align-items-md-center align-items-end w-100">
              <router-link class="text-dark mt-md-0 mt-3" to="/cart">
                <i class="fas fa-chevron-left mr-2"></i>BACK TO CHECK ORDER
              </router-link>

              <button type="submit" :disabled="invalid" class="btn btn-dark py-3 px-7">Send
                <!-- <router-link class="text-white" to="/checkoutsuccess">
                  Send
                </router-link> -->
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  data() {
    return {
      cart: {},
      cartTotal: 0,
      coupon: {},
      couponCode: '',
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
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
          this.$router.push(`/CheckoutSuccess/${response.data.data.id}`);
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

@media (max-width: 575.98px) {
  .cartStatus {
    font-size: 8px;
  }
}

@media (max-width: 320px) {
  .cartStatus {
    display: none;
  }
}

</style>
