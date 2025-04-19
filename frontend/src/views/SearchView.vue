<template>
  <div class="search-view">
    <section class="search-header">
      <h1>Search Results</h1>
      <p v-if="hasSearched && !isLoading && results.length > 0">
        {{ results.length }} products found for "{{ searchQuery }}"
      </p>
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for products, brands, or ingredients..."
          class="search-input"
          @keyup.enter="search"
        />
        <button class="search-button" @click="search">Search</button>
      </div>
    </section>

    <div v-if="hasSearched && !isLoading" class="search-results">
      <div v-if="results.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h2>No products found</h2>
        <p>We couldn't find any products matching "{{ searchQuery }}"</p>
        <div class="suggestions">
          <h3>Suggestions:</h3>
          <ul>
            <li>Check your spelling</li>
            <li>Try more general terms</li>
            <li>Try different keywords</li>
          </ul>
        </div>
      </div>

      <div v-else>
        <div class="filter-options">
          <div class="filter-group">
            <label>Category:</label>
            <select v-model="selectedCategory">
              <option value="">All Categories</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Haircare">Haircare</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Sort by:</label>
            <select v-model="sortOption">
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <div class="product-grid">
          <div
            v-for="(product, index) in filteredResults"
            :key="index"
            class="product-card"
          >
            <a
              href="#"
              class="product-link"
              @click.prevent="viewProductDetails(product)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="product-details">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-category">{{ product.category }}</div>
                <div class="product-rating">★★★★★ 4.8 | 1200+ sold</div>
                <div class="product-price">${{ product.price.toFixed(2) }}</div>
                <div class="product-status">
                  <span :class="getStatusClass(product.status)">{{
                    product.status
                  }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Searching products...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
    const route = useRoute();
    const router = useRouter();
    const searchQuery = ref('');
    const results = ref<Product[]>([]);
    const isLoading = ref(false);
    const hasSearched = ref(false);
    const selectedCategory = ref('');
    const sortOption = ref('relevance');

    // Mock data for search results
    const mockProducts = [
      {
        name: 'COSRX Advanced Snail 96 Mucin Power Essence',
        category: 'Skincare',
        price: 19.99,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/11bca5ea9dd59f39542e9c478d0a566f',
      },
      {
        name: 'The Ordinary Niacinamide 10% + Zinc 1%',
        category: 'Skincare',
        price: 12.99,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/sg-11134201-22100-6d9hk6nfi5ivd1',
      },
      {
        name: 'Laneige Water Sleeping Mask',
        category: 'Skincare',
        price: 28.5,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/sg-11134201-22100-t1is2o4k26iv6f',
      },
      {
        name: 'Innisfree Green Tea Seed Serum',
        category: 'Skincare',
        price: 27.99,
        status: 'Low Stock',
        image: 'https://cf.shopee.co.id/file/ed6f3a95240a8f839293c55c0bf9df0e',
      },
      {
        name: 'SOME BY MI AHA BHA PHA 30 Days Miracle Toner',
        category: 'Skincare',
        price: 16.99,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/0eb9a7644282325ad7eddd169c5dd557',
      },
      {
        name: 'Cetaphil Gentle Skin Cleanser',
        category: 'Skincare',
        price: 10.99,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/b8f217c1918028a5982a8e35764701a0',
      },
      {
        name: 'Maybelline Fit Me Matte + Poreless Foundation',
        category: 'Makeup',
        price: 8.99,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/d12643fb962c7edc3bef6e9a49f6bb37',
      },
      {
        name: 'Pantene Pro-V Total Damage Care Shampoo',
        category: 'Haircare',
        price: 7.5,
        status: 'In Stock',
        image: 'https://cf.shopee.co.id/file/a3cd84bfeab89038a631fac0fc9c19d4',
      },
    ];

    const filteredResults = computed(() => {
      let filtered = [...results.value];

      if (selectedCategory.value) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory.value,
        );
      }

      if (sortOption.value === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption.value === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    });

    const search = (): void => {
      if (!searchQuery.value.trim()) return;

      isLoading.value = true;
      hasSearched.value = true;

      // Update URL with query parameter
      router.push({
        path: '/search',
        query: { q: searchQuery.value },
      });

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

    const viewProductDetails = (product: Product): void => {
      // This would navigate to product details in a real app
      console.log('View product:', product.name);
    };

    onMounted(() => {
      // Check if there's a query parameter in the URL
      const queryParam = route.query.q;
      if (queryParam && typeof queryParam === 'string') {
        searchQuery.value = queryParam;
        search();
      }
    });

    return {
      searchQuery,
      results,
      filteredResults,
      isLoading,
      hasSearched,
      selectedCategory,
      sortOption,
      search,
      getStatusClass,
      viewProductDetails,
    };
  },
});
</script>

<style scoped>
.search-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.search-header p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.search-container {
  display: flex;
  max-width: 700px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 1rem;
  background-color: white;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 2px 15px rgba(255, 107, 158, 0.15);
}

.search-button {
  background-color: #ff6b9e;
  color: white;
  border: none;
  border-radius: 0 50px 50px 0;
  padding: 0 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #ff4785;
}

.filter-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #666;
}

.filter-group select {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
  color: #333;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-results p {
  color: #666;
  margin-bottom: 1.5rem;
}

.suggestions {
  max-width: 300px;
  margin: 0 auto;
  text-align: left;
}

.suggestions h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.suggestions ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.suggestions li {
  margin-bottom: 0.3rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff6b9e;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  overflow: hidden;
}

.product-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-details {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.product-rating {
  font-size: 0.85rem;
  color: #f8a100;
  margin-bottom: 0.7rem;
  font-weight: 500;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ff6b9e;
  margin-bottom: 0.7rem;
}

.product-status {
  font-size: 0.85rem;
  font-weight: 500;
}

.status-instock {
  color: #00b67a;
}

.status-lowstock {
  color: #f39c12;
}

.status-outofstock {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .search-view {
    padding: 1rem;
  }

  .search-input {
    padding: 0.8rem 1rem;
  }

  .search-button {
    padding: 0 1rem;
  }

  .filter-options {
    flex-direction: column;
    gap: 1rem;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .product-image {
    height: 160px;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1280px) {
  .search-view {
    max-width: 1600px;
  }
}
</style>
