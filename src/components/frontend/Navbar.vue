<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/">Bonjour</router-link>
      <button class="navbar-toggler"
      type="button" data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <ul class="navbar-nav text-left">
          <li class="nav-item">
            <router-link class="nav-link mr-4" to="/">
            Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link mr-4" to="/products">
            products
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link mr-4" to="/about">
            About
            </router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link" href="#" id="navbarDropdown"
             :data-toggle="$route.path !== '/cart' ? 'dropdown' : ''">
             ShoppingCart
             <span class="badge badge-pill badge-danger"
              v-if="cart.length" style="transform: translateX(-4px) translateY(-7px);">
              {{cart.length}}
             </span>
            <!-- <span class="d-block d-sm-none">購物車</span> -->
            </a>

            <div class="dropdown-menu dropdown-menu-right text-center"
             v-show="$route.path !== '/cart'" >
              <!-- 未購物 -->
              <div v-if="!cart.length ">
                <h6 class="itemTitle my-2">您尚未選擇商品</h6>
                <router-link to="/products" class>
                  <button class="btn btn-info mt-1">
                    <i class="fas fa-couch"></i> 先去選購吧
                  </button>
                </router-link>
              </div>
              <!-- 有商品 -->
              <div v-if="cart.length">
                <h6 class="itemTitle text-center my-2">已選擇商品</h6>
                <div class="cart-scroll">
                  <table class="itemContent">
                    <tbody class="d-flex justify-content-start align-items-center flex-column">
                      <tr v-for="item in cart" :key="item.id">
                        <td class="itemPicture">
                          <img :src="item.product.imageUrl[0]" alt />
                        </td>
                        <td class="itemName">{{ item.product.title }}</td>
                        <td>x{{ item.quantity }}</td>
                        <td class="text-warning">{{ item.product.price | currency }}</td>
                        <td class="trashIcon" @click="removeCartItem(item.product.id)">
                          <i class="far fa-trash-alt"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="totalInfo">
                  <p>
                    小計
                    <span class="text-warning h4 ml-5">{{ cartTotal | currency }}</span>
                  </p>
                  <router-link to="/cart" class="payBtn">
                    <button class="btn btn-warning">
                      <i class="fa fa-shopping-cart"></i> 結帳去
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </li>

          <!-- <li class="nav-item">
            <router-link class="nav-item nav-link mr-4" to="/login">
            login
            </router-link>
          </li> -->
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      cart: {},
      cartTotal: 0,
    };
  },
  created() {
    this.getCart();
    const vm = this;
    vm.$bus.$on('add-cart', (item, quantity) => {
      vm.addToCart(item, quantity);
    });
    vm.$bus.$on('nav-getCart', () => {
      vm.getCart();
    });
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
    updateTotal() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    addToCart(item, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const cart = {
        product: item.id,
        quantity,
      };

      this.$http.post(url, cart).then((response) => {
        this.getCart();
        this.$bus.$emit('message:push', `"${response.data.data.product.title}" 已成功放入購物車！`, 'success');
      }).catch((error) => {
        this.$bus.$emit('message:push', `${error.response.data.errors[0]}可直接去結帳囉~`, 'info');
      });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(url).then((response) => {
        this.$bus.$emit('message:push', `${response.data.message}`, 'success');
        this.getCart();
      });
    },
    beforeDestroy() {
      // 元件銷毀前要註銷監聽事件
      this.$bus.$off('add-cart');
      this.$bus.$off('nav-getCart');
    },
  },
};
// export default {
//   name: 'Navbar',
//   data() {
//     return {
//       carts: [],
//     };
//   },
//   methods: {
//     getCart() {
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
//       this.$http.get(url)
//         .then((res) => {
//           console.log('getCart', res);
//           this.carts = res.data.data;
//         });
//     },
//   },
//   created() {
//     this.getCart();
//     this.$bus.$on('get-cart', (product, quantity) => {
//       this.getCart(product, quantity);
//     });
//   },
// };
</script>

<style lang="scss">

.dropdown {

  .dropdown-menu {
      width: 360px;

      .cart-scroll {
        max-width: 360px;
        max-height: 40vh;
        overflow-y: auto;
      }

      .totalInfo {
        padding: 3px 13px;
        text-align: right;

        p {
          font-size: 18px;
        }

        .payBtn {
          display: block;

          i {
            font-size: 16px;
          }
        }
      }

    }

    @media (max-width: 575.98px) {
      .dropdown-menu {
        width: 300px;
      }
    }

}

table.itemContent {
  tbody {
    padding: 3px 10px;

    tr {
      margin: 6px 3px;
      border-bottom: 1px solid black;

      td {
        padding: 5px;
      }

      .itemPicture {
        img {
          width: 90%;
          min-width: 50px;
          height: 50px;
          object-fit: cover;
        }
      }

      .itemName {
        width: 50%;
      }

      .trashIcon {
        cursor: pointer;
      }

      .trashIcon:hover {
        color: #f00;
      }
    }
  }
}

</style>
