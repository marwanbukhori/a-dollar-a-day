<template>
  <div class="search">
    <h1>Search Products</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for products..."
        class="search-input"
        @keyup.enter="search"
      />
      <button class="search-button" @click="search">Search</button>
    </div>

    <div v-if="hasSearched && !isLoading" class="search-results">
      <div v-if="results.length === 0" class="no-results">
        <p>No products found matching your search. Try different keywords.</p>
      </div>

      <div v-else class="results-grid">
        <div
          v-for="(product, index) in results"
          :key="index"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-price">${{ product.price.toFixed(2) }}</p>
            <div class="product-status">
              <span :class="getStatusClass(product.status)">{{
                product.status
              }}</span>
            </div>
            <div class="product-actions">
              <button class="view-button">View Details</button>
              <button class="add-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <p>Searching products...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Product {
  name: string;
  category: string;
  price: number;
  status: string;
  image: string;
}

export default defineComponent({
  name: 'SearchView',
  setup() {
    const searchQuery = ref('');
    const results = ref<Product[]>([]);
    const isLoading = ref(false);
    const hasSearched = ref(false);

    // Mock data for search results
    const mockProducts = [
      {
        name: 'Hydrating Face Serum',
        category: 'Skincare',
        price: 45.99,
        status: 'In Stock',
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Vitamin C Brightening Cream',
        category: 'Skincare',
        price: 38.5,
        status: 'In Stock',
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Matte Lipstick - Red',
        category: 'Makeup',
        price: 22.99,
        status: 'In Stock',
        image: 'https://via.placeholder.com/150',
      },
      {
        name: 'Rejuvenating Night Cream',
        category: 'Skincare',
        price: 52.0,
        status: 'Low Stock',
        image: 'https://via.placeholder.com/150',
      },
    ];

    const search = (): void => {
      if (!searchQuery.value.trim()) return;

      isLoading.value = true;
      hasSearched.value = true;

      // Simulate API call delay
      setTimeout(() => {
        // Filter mock products based on search query
        const query = searchQuery.value.toLowerCase();
        results.value = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query),
        );

        isLoading.value = false;
      }, 800);
    };

    const getStatusClass = (status: string): string => {
      if (status === 'In Stock') return 'status-instock';
      if (status === 'Low Stock') return 'status-lowstock';
      if (status === 'Out of Stock') return 'status-outofstock';
      return '';
    };

    return {
      searchQuery,
      results,
      isLoading,
      hasSearched,
      search,
      getStatusClass,
    };
  },
});
</script>

<style scoped>
.search {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #ee4d2d;
}

.search-button {
  background-color: #ff6b9e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ff4785;
}

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.product-image img {
  max-width: 100%;
  max-height: 180px;
  object-fit: contain;
}

.product-info {
  padding: 1.25rem;
}

.product-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-weight: 600;
  font-size: 1.2rem;
  color: #ee4d2d;
  margin-bottom: 0.75rem;
}

.product-status {
  margin-bottom: 1rem;
}

.status-instock {
  background-color: #e6f7ee;
  color: #28a745;
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

.status-outofstock {
  background-color: #f8e6e6;
  color: #dc3545;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.view-button,
.add-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-button {
  background-color: #f2f2f2;
  color: #333;
}

.view-button:hover {
  background-color: #e6e6e6;
}

.add-button {
  background-color: #ee4d2d;
  color: white;
}

.add-button:hover {
  background-color: #d04224;
}
</style>
