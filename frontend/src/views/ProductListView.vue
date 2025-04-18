<template>
  <div class="products">
    <h1>Product Management</h1>

    <div class="actions-bar">
      <div class="search-filter">
        <input
          type="text"
          placeholder="Search products..."
          class="search-input"
          v-model="searchQuery"
        />
        <select class="filter-select" v-model="selectedCategory">
          <option value="">All Categories</option>
          <option value="Skincare">Skincare</option>
          <option value="Makeup">Makeup</option>
          <option value="Haircare">Haircare</option>
          <option value="Fragrance">Fragrance</option>
        </select>
      </div>
      <router-link to="/products/add">
        <button class="add-product-btn">+ Add Product</button>
      </router-link>
    </div>

    <div class="products-table-container">
      <table class="products-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                class="select-all"
                @change="toggleSelectAll"
                v-model="selectAll"
              />
            </th>
            <th>Image</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
            <td>
              <input type="checkbox" v-model="selectedProducts[index]" />
            </td>
            <td>
              <div
                class="product-image"
                :style="{ backgroundImage: `url(${product.image})` }"
              ></div>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.category }}</td>
            <td>${{ product.price.toFixed(2) }}</td>
            <td>
              <span :class="getStockClass(product.stock)">
                {{ product.stock }}
              </span>
            </td>
            <td>
              <span :class="getStatusClass(product.status)">
                {{ product.status }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <router-link :to="`/products/edit/${index + 1}`">
                  <button class="action-btn edit-btn">Edit</button>
                </router-link>
                <button
                  class="action-btn delete-btn"
                  @click="deleteProduct(index)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button class="pagination-btn">&laquo;</button>
      <button class="pagination-btn active">1</button>
      <button class="pagination-btn">2</button>
      <button class="pagination-btn">3</button>
      <button class="pagination-btn">&raquo;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Product {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
}

export default defineComponent({
  name: 'ProductListView',

  setup() {
    const products = ref<Product[]>([
      {
        name: 'Hydrating Face Serum',
        sku: 'SKU-001',
        category: 'Skincare',
        price: 45.99,
        stock: 124,
        status: 'Active',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Vitamin C Brightening Cream',
        sku: 'SKU-002',
        category: 'Skincare',
        price: 38.5,
        stock: 89,
        status: 'Active',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Matte Lipstick - Red',
        sku: 'SKU-003',
        category: 'Makeup',
        price: 22.99,
        stock: 213,
        status: 'Active',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Rejuvenating Night Cream',
        sku: 'SKU-004',
        category: 'Skincare',
        price: 52.0,
        stock: 35,
        status: 'Low Stock',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Hydrating Shampoo',
        sku: 'SKU-005',
        category: 'Haircare',
        price: 18.99,
        stock: 78,
        status: 'Active',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Cucumber Eye Gel',
        sku: 'SKU-006',
        category: 'Skincare',
        price: 28.5,
        stock: 0,
        status: 'Out of Stock',
        image: 'https://via.placeholder.com/40x40',
      },
      {
        name: 'Rose Floral Perfume',
        sku: 'SKU-007',
        category: 'Fragrance',
        price: 65.0,
        stock: 42,
        status: 'Active',
        image: 'https://via.placeholder.com/40x40',
      },
    ]);

    const searchQuery = ref('');
    const selectedCategory = ref('');
    const selectAll = ref(false);
    const selectedProducts = ref<boolean[]>(
      Array(products.value.length).fill(false),
    );

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory =
          !selectedCategory.value ||
          product.category === selectedCategory.value;
        return matchesSearch && matchesCategory;
      });
    });

    const toggleSelectAll = (): void => {
      selectedProducts.value = selectedProducts.value.map(
        () => selectAll.value,
      );
    };

    const deleteProduct = (index: number): void => {
      if (confirm('Are you sure you want to delete this product?')) {
        products.value.splice(index, 1);
        selectedProducts.value.splice(index, 1);
      }
    };

    const getStockClass = (stock: number): string => {
      if (stock === 0) return 'stock-out';
      if (stock < 50) return 'stock-low';
      return 'stock-ok';
    };

    const getStatusClass = (status: string): string => {
      switch (status) {
        case 'Active':
          return 'status-active';
        case 'Out of Stock':
          return 'status-outofstock';
        case 'Low Stock':
          return 'status-lowstock';
        default:
          return '';
      }
    };

    return {
      products,
      searchQuery,
      selectedCategory,
      selectAll,
      selectedProducts,
      filteredProducts,
      toggleSelectAll,
      deleteProduct,
      getStockClass,
      getStatusClass,
    };
  },
});
</script>

<style scoped>
.products {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.search-filter {
  display: flex;
  gap: 1rem;
  flex: 1;
  max-width: 600px;
}

.search-input,
.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-input {
  flex: 1;
}

.filter-select {
  width: 150px;
}

.add-product-btn {
  background-color: #ee4d2d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-product-btn:hover {
  background-color: #d04224;
}

.products-table-container {
  overflow-x: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th,
.products-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.products-table th {
  font-weight: 600;
  color: #666;
  background-color: #f9f9f9;
}

.product-image {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

.stock-ok {
  color: #28a745;
}

.stock-low {
  color: #ffc107;
}

.stock-out {
  color: #dc3545;
}

.status-active {
  background-color: #e6f7ee;
  color: #28a745;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-outofstock {
  background-color: #f8e6e6;
  color: #dc3545;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-lowstock {
  background-color: #fff8e6;
  color: #ffc107;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #e6f0f9;
  color: #0d6efd;
}

.edit-btn:hover {
  background-color: #cde0f7;
}

.delete-btn {
  background-color: #f8e6e6;
  color: #dc3545;
}

.delete-btn:hover {
  background-color: #f5d0d0;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover {
  border-color: #ee4d2d;
  color: #ee4d2d;
}

.pagination-btn.active {
  background-color: #ee4d2d;
  border-color: #ee4d2d;
  color: white;
}
</style>
