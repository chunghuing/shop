<template>
  <div class="position-relative d-flex">
    <div class="container d-flex flex-column bg-white mb-5" style="min-height: 100vh;">
      <table class="table paymentTable mt-5">
        <thead>
          <tr>
            <th colspan="4">購買清單</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="itemPicture">
              <img :src="item.product.imageUrl[0]" class="img-fluid" />
            </td>
            <td>{{item.product.title}}</td>
            <td class="text-center">x{{ item.quantity }}</td>
            <td class="text-right">{{item.product.price | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="order.coupon">
            <td colspan="3" class="text-right py-3">優惠折抵</td>
            <td class="text-right">
              - NT {{ (order.amount*(100/order.coupon.percent)) -
              (order.amount*(100/order.coupon.percent)) * (order.coupon.percent / 100)  | currency}}
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-right" :class="{ isCoupon: order.coupon }">總計</td>
            <td class="text-right text-danger" :class="{ isCoupon: order.coupon }">
              {{ order.amount  | currency}}
            </td>
          </tr>
        </tfoot>
      </table>

      <table class="table orderOkTable mt-5">
        <thead>
          <tr>
            <th colspan="2">訂單資訊</th>
          </tr>
        </thead>
        <tbody class="text-left">
          <tr>
            <td>RecipientEmail：</td>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <td width="150px">RecipientName：</td>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <td>RecipientPhone：</td>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <td>RecipientAddress：</td>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <td>Payment：</td>
            <td>{{ order.payment }}</td>
          </tr>
          <tr>
            <td>message：</td>
            <td>{{ order.message }}</td>
          </tr>
          <tr>
            <td>payment status：</td>
            <td v-if="!order.paid" class="h5 text-danger">尚未付款</td>
            <td v-if="order.paid" class="h5 text-danger">已付款</td>
          </tr>
        </tbody>
      </table>
      <button v-if="!order.paid" @click="payOrder()" type="button"
       class="btn btn-warning d-block mx-auto my-3">
        <i class="fas fa-clipboard-check"></i> 確認付款
      </button>
      <router-link to="/products">
        <button v-if="order.paid" type="button" class="btn btn-warning d-block mx-auto my-3">
          <i class="fas fa-couch"></i> 繼續選購
        </button>
      </router-link>
    </div>

    <div id="paymentModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <div class="h5 text-secondary font-weight-bold">恭喜您</div>
            <div class="h5 text-secondary font-weight-bold">付款成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      // isLoading: false,
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  created() {
    this.orderId = this.$route.params.orderId;

    if (this.orderId) {
      this.getDetailed(this.orderId);
    }
  },
  methods: {
    getDetailed(id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${id}`;

      this.$http.get(url).then((response) => {
        this.order = response.data.data;
      });
    },
    // 使用者對某筆訂單付款結帳
    payOrder() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}/paying`;

      this.$http.post(url).then((response) => {
        $('#paymentModal').modal('show');
        setTimeout(() => {
          $('#paymentModal').modal('hide');
        }, 5000);

        // 如果成功true，重跑頁面
        if (response.data.data.paid) {
          this.getDetailed(this.orderId);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.paymentTable {
  border: 1px solid #5A6268;

  thead {
    background-color: #5A6268;
    color: #ffffff;

    th {
      padding: 10px 20px;
      border-bottom: none;
    }
  }

  td {
    padding: 10px 15px;
  }

  .itemPicture {
    width: 120px;

    img {
      width: 90%;
      min-width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
}

@media (max-width: 575.98px) {
  .paymentTable {
    td {
      padding: 10px 5px;
    }

    .itemPicture {
      width: 0px;
      padding: 0;

      img {
        display: none;
      }

    }
  }

}

.orderOkTable {
  border: 1px solid #5A6268;

  thead {
    background-color: #5A6268;
    color: #ffffff;
  }
}
</style>
