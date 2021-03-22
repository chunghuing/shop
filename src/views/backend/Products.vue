<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="d-flex mb-2">
        <h1 class="h5 mr-auto font-weight-bold">產品列表</h1>
        <div>
          <button @click="openModal('new')" class="btn btn-sm
          btn-outline-dark px-5 font-weight-bold"><i class="fas fa-plus mr-1"></i>新增產品</button>
        </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">分類</th>
              <th scope="col">品名</th>
              <th scope="col">圖片縮圖</th>
              <th scope="col" class="text-right">原價</th>
              <th scope="col" class="text-right">售價</th>
              <th scope="col" class="text-center">是否啟用</th>
              <th scope="col" class="text-center">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
              <th scope="row">{{index + 1}}</th>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>
                <img
                  :src="item.imageUrl[0]"
                  width="100px"
                  class="img-fluid"
                >
              </td>
              <td class="text-right">{{ item.origin_price }}</td>
              <td class="text-right">{{ item.price}}</td>
              <td class="text-center">
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                  :disabled="loadingBtn === item.id">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  v-if="loadingBtn === item.id"></span>
                    編輯
                  </button>
                  <button class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- pagination 元件 -->
        <!-- 元件中 emitPages() 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts -->
        <pagination :pages="pagination" @emit-pages="getProducts"></pagination>

        <!-- 新增/編輯 Modal 元件 -->
        <ProductModal :status="status" :is-new="isNew" :temp-product="tempProduct"
        @update="getProducts"></ProductModal>

        <!-- 刪除 deleteModal 元件 -->
        <DeleteModal :temp-product="tempProduct" :del-name="delName" @update="getProducts">
        </DeleteModal>

        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/backend/ProductModal.vue';
import DeleteModal from '@/components/backend/DeleteModal.vue';

export default {
  name: 'Products',
  components: {
    DeleteModal,
    ProductModal,
    Pagination,
  },
  data() {
    return {
      products: [], // 放置 AJAX 回來的產品資料。
      tempProduct: { // 暫存資料用，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
        imageUrl: [],
      },
      pagination: {}, // 放置分頁資料用。
      isNew: false, // 用於判斷接下來的行為是新增產品(true)或編輯產品(false)。
      status: { // 用於切換上傳圖片時的小 icon，主要是增加使用者體驗。
        fileUploading: false,
      },
      loadingBtn: '',
      delName: '商品',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      console.log('page', page);

      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http.get(url).then((res) => {
        console.log('getProducts', res);
        this.products = res.data.data; // 取得產品列表
        this.pagination = res.data.meta.pagination; // 取得分頁資訊
      });
    },
    openModal(modalStatus, item) {
      switch (modalStatus) {
        // 新增
        case 'new': {
          // 給新的參考路徑，並定義第二層物件的屬性
          this.tempProduct = { // 新增之前必須先清除原有可能暫存的資料
            imageUrl: [],
          };
          this.isNew = true; // 切換狀態為 true 代表新增
          $('#productModal').modal('show');
          break;
        }
        // 編輯
        case 'edit': {
          this.loadingBtn = item.id; // 當 loadingBtn = item.id 時顯示 loading 畫面
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;

          this.$http.get(url).then((res) => {
            this.tempProduct = res.data.data; // 取得成功後回寫到 tempProduct
            $('#productModal').modal('show'); // 確保資料已經回寫後再打開 Modal
            this.loadingBtn = ''; // 清除 loading 畫面
          }).catch(() => {
          });
          // 物件深拷貝
          // this.tempProduct = JSON.parse(JSON.stringify(item));
          this.isNew = false; // 切換狀態為 false 代表編輯
          break;
        }
        // 刪除
        case 'delete': {
          // 物件深拷貝
          // this.tempProduct = JSON.parse(JSON.stringify(item));
          // 物件淺拷貝
          this.tempProduct = { ...item }; // 由於目前範本僅有一層物件，因此使用淺拷貝
          $('#deleteModal').modal('show');
          break;
        }
        default: {
          break;
        }
      }
    },
  },
};
</script>
