<template>
  <div class="skin-problem-view">
    <div class="problem-header">
      <h1>{{ formattedTag }}</h1>
      <p>
        Products recommended for {{ formattedTag.toLowerCase() }} skin concerns
      </p>
    </div>

    <div class="problem-content">
      <!-- Filter sidebar -->
      <aside class="filters-sidebar">
        <div class="filter-section">
          <h3>Filter Options</h3>

          <!-- Search box -->
          <div class="filter-group">
            <h4>Search</h4>
            <div class="search-input">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                @input="applyFilters"
              />
            </div>
          </div>

          <div class="filter-group">
            <h4>Price Range</h4>
            <div class="price-inputs">
              <input
                v-model="priceMin"
                type="number"
                placeholder="Min"
                min="0"
                @change="applyFilters"
              />
              <span>-</span>
              <input
                v-model="priceMax"
                type="number"
                placeholder="Max"
                min="0"
                @change="applyFilters"
              />
            </div>
          </div>

          <div class="filter-group">
            <h4>Categories</h4>
            <div class="checkbox-group">
              <label
                v-for="category in categories"
                :key="category"
                class="checkbox-item"
              >
                <input
                  v-model="selectedCategories"
                  type="checkbox"
                  :value="category"
                  @change="applyFilters"
                />
                <span>{{ category }}</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <h4>Rating</h4>
            <div class="rating-filter">
              <label class="radio-item">
                <input
                  v-model="minRating"
                  type="radio"
                  name="rating"
                  :value="0"
                  @change="applyFilters"
                />
                <span>All Ratings</span>
              </label>
              <label class="radio-item">
                <input
                  v-model="minRating"
                  type="radio"
                  name="rating"
                  :value="4"
                  @change="applyFilters"
                />
                <span>4★ & Up</span>
              </label>
              <label class="radio-item">
                <input
                  v-model="minRating"
                  type="radio"
                  name="rating"
                  :value="4.5"
                  @change="applyFilters"
                />
                <span>4.5★ & Up</span>
              </label>
            </div>
          </div>

          <button class="reset-filters" @click="resetFilters">
            Reset Filters
          </button>
        </div>
      </aside>

      <!-- Products display -->
      <div class="products-container">
        <!-- Sort options -->
        <div class="sort-options">
          <span>Sort by:</span>
          <select v-model="sortOption" @change="sortProducts">
            <option value="popularity">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div v-if="isLoading" class="loading">
          <div class="loading-spinner"></div>
          <p>Loading products...</p>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="no-products">
          <div class="no-results-icon">📦</div>
          <h2>No products found</h2>
          <p v-if="hasActiveFilters">No products match your current filters.</p>
          <p v-else>
            We couldn't find any products for {{ formattedTag.toLowerCase() }}.
          </p>
          <button
            v-if="hasActiveFilters"
            class="reset-filters-btn"
            @click="resetFilters"
          >
            Reset Filters
          </button>
          <router-link v-else to="/" class="back-home-btn">
            Back to Home
          </router-link>
        </div>

        <div v-else>
          <p class="product-count">
            {{ filteredProducts.length }} products found
          </p>
          <div class="problem-banner">
            <h3>What is {{ formattedTag }}?</h3>
            <p>{{ getProblemDescription() }}</p>
          </div>
          <div class="product-grid">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-card"
            >
              <a
                :href="product.affiliateLink"
                target="_blank"
                rel="noopener noreferrer"
                class="product-link"
              >
                <div class="product-image">
                  <img :src="product.imageUrl" :alt="product.name" />
                </div>
                <div class="product-details">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <div class="product-category">{{ product.category }}</div>
                  <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-text"
                      >{{ Number(product.rating).toFixed(1) }} |
                      {{ product.sold }}+ sold</span
                    >
                  </div>
                  <div class="product-price">
                    ${{ Number(product.price).toFixed(2) }}
                  </div>
                  <div class="product-tags">
                    <span
                      v-for="problem in product.skinProblem"
                      :key="problem"
                      :class="{ 'highlight-tag': isCurrentTag(problem) }"
                      class="tag"
                    >
                      {{ problem }}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  skinProblem: string[];
  price: number;
  rating: number;
  sold: number;
  affiliateLink: string;
}

export default defineComponent({
  name: 'SkinProblemView',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const products = ref<Product[]>([]);
    const filteredProducts = ref<Product[]>([]);
    const isLoading = ref(true);

    // Filter state
    const priceMin = ref<number | null>(null);
    const priceMax = ref<number | null>(null);
    const selectedCategories = ref<string[]>([]);
    const minRating = ref<number>(0);
    const sortOption = ref('popularity');
    const searchQuery = ref('');

    const formattedTag = computed(() => {
      // Format tag for display (e.g., "dry-skin" to "Dry Skin")
      return props.tag
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });

    const normalizedTag = computed(() => {
      // Normalize tag for matching (e.g., "dry-skin" to "Dry Skin")
      return formattedTag.value;
    });

    // All available categories from products
    const categories = computed(() => {
      const uniqueCategories = new Set<string>();
      products.value.forEach((product) => {
        uniqueCategories.add(product.category);
      });
      return Array.from(uniqueCategories).sort();
    });

    const hasActiveFilters = computed(() => {
      return (
        (priceMin.value !== null && priceMin.value > 0) ||
        (priceMax.value !== null && priceMax.value > 0) ||
        selectedCategories.value.length > 0 ||
        minRating.value > 0 ||
        searchQuery.value.trim() !== ''
      );
    });

    const isCurrentTag = (tag: string): boolean => {
      return tag.toLowerCase() === normalizedTag.value.toLowerCase();
    };

    const getProblemDescription = (): string => {
      const descriptions: Record<string, string> = {
        Acne: 'Acne is a skin condition characterized by pimples, blackheads, and whiteheads due to inflamed or infected sebaceous glands. Products for acne often contain ingredients like salicylic acid, benzoyl peroxide, or niacinamide.',
        'Dry Skin':
          'Dry skin lacks moisture and may feel tight, rough, or flaky. Look for products with hyaluronic acid, glycerin, and ceramides to help restore moisture and strengthen the skin barrier.',
        'Oily Skin':
          'Oily skin produces excess sebum, leading to a shiny appearance. Products for oily skin often contain ingredients that control oil production without over-drying the skin.',
        Sensitive:
          'Sensitive skin reacts easily to environmental factors or ingredients. Products for sensitive skin are typically fragrance-free and contain soothing ingredients like aloe vera, centella asiatica, or oatmeal.',
        Dullness:
          'Dull skin lacks radiance and may appear tired or uneven in tone. Products for dullness often contain vitamin C, AHAs, or other brightening ingredients.',
        Aging:
          'Products for aging skin target fine lines, wrinkles, and loss of elasticity with ingredients like retinol, peptides, and antioxidants.',
        Pigmentation:
          'Hyperpigmentation is the darkening of areas of skin. Products for this concern typically contain ingredients like vitamin C, niacinamide, or alpha arbutin.',
        Pores:
          'Enlarged or clogged pores can make skin appear textured. Products for this concern often contain BHAs like salicylic acid to clear and refine pores.',
      };

      return (
        descriptions[normalizedTag.value] ||
        `Products specifically formulated to address ${normalizedTag.value.toLowerCase()} concerns.`
      );
    };

    const fetchProducts = async () => {
      isLoading.value = true;

      try {
        console.log(`Fetching products for skin problem: ${props.tag}`);
        console.log(`Normalized tag: ${normalizedTag.value}`);
        const response = await axios.get(
          `/api/products/skin-problem/${normalizedTag.value}`,
        );
        console.log('API Response:', response.data);
        products.value = response.data;

        if (response.data.length === 0) {
          console.warn(
            `No products found for skin problem: ${normalizedTag.value}`,
          );
          console.log('Falling back to mock data');
          products.value = getMockProductsBySkinProblem(normalizedTag.value);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback mock data if API fails
        products.value = getMockProductsBySkinProblem(normalizedTag.value);
      } finally {
        isLoading.value = false;
        applyFilters(); // Initial filter application
      }
    };

    const applyFilters = () => {
      let result = [...products.value];

      // Apply price filter
      if (priceMin.value !== null && priceMin.value > 0) {
        result = result.filter(
          (product) => Number(product.price) >= priceMin.value!,
        );
      }

      if (priceMax.value !== null && priceMax.value > 0) {
        result = result.filter(
          (product) => Number(product.price) <= priceMax.value!,
        );
      }

      // Apply category filter
      if (selectedCategories.value.length > 0) {
        result = result.filter((product) =>
          selectedCategories.value.includes(product.category),
        );
      }

      // Apply rating filter
      if (minRating.value > 0) {
        result = result.filter(
          (product) => Number(product.rating) >= minRating.value,
        );
      }

      // Apply search filter
      if (searchQuery.value.trim() !== '') {
        const query = searchQuery.value.toLowerCase().trim();
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query),
        );
      }

      // Apply sorting
      sortProductsArray(result);

      filteredProducts.value = result;
    };

    const sortProducts = () => {
      sortProductsArray(filteredProducts.value);
    };

    const sortProductsArray = (arrayToSort: Product[]) => {
      switch (sortOption.value) {
        case 'price-asc':
          arrayToSort.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'price-desc':
          arrayToSort.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case 'rating':
          arrayToSort.sort((a, b) => Number(b.rating) - Number(a.rating));
          break;
        case 'popularity':
        default:
          arrayToSort.sort((a, b) => b.sold - a.sold);
          break;
      }
    };

    const resetFilters = () => {
      priceMin.value = null;
      priceMax.value = null;
      selectedCategories.value = [];
      minRating.value = 0;
      sortOption.value = 'popularity';
      searchQuery.value = '';
      applyFilters();
    };

    // Mock data function to use if API fails
    const getMockProductsBySkinProblem = (problem: string): Product[] => {
      const mockProducts = [
        {
          id: '1',
          name: 'SOME BY MI AHA-BHA-PHA 30 Days Miracle Toner',
          imageUrl:
            'https://cf.shopee.co.id/file/0eb9a7644282325ad7eddd169c5dd557',
          category: 'Toner',
          skinProblem: ['Acne', 'Oily Skin'],
          price: 16.99,
          rating: 4.8,
          sold: 5200,
          affiliateLink: 'https://shopee.com/affiliate/123',
        },
        {
          id: '2',
          name: 'Cosrx Advanced Snail 96 Mucin Power Essence',
          imageUrl:
            'https://cf.shopee.co.id/file/11bca5ea9dd59f39542e9c478d0a566f',
          category: 'Essence',
          skinProblem: ['Dry Skin', 'Sensitive'],
          price: 19.99,
          rating: 4.9,
          sold: 10500,
          affiliateLink: 'https://shopee.com/affiliate/456',
        },
        {
          id: '3',
          name: 'Laneige Water Sleeping Mask',
          imageUrl:
            'https://cf.shopee.co.id/file/e556b4d9e335da1d7111e2103d35ea96',
          category: 'Mask',
          skinProblem: ['Dry Skin', 'Dullness'],
          price: 25.0,
          rating: 4.7,
          sold: 8900,
          affiliateLink: 'https://shopee.com/affiliate/789',
        },
        {
          id: '4',
          name: 'The Ordinary Niacinamide 10% + Zinc 1%',
          imageUrl:
            'https://cf.shopee.co.id/file/d8ec55ef59e8e78f64487fc34a44983e',
          category: 'Serum',
          skinProblem: ['Acne', 'Oily Skin', 'Pores'],
          price: 12.5,
          rating: 4.6,
          sold: 15600,
          affiliateLink: 'https://shopee.com/affiliate/101',
        },
        {
          id: '5',
          name: "Paula's Choice 2% BHA Liquid Exfoliant",
          imageUrl:
            'https://cf.shopee.co.id/file/sg-11134201-22110-9sz1d92s9ejv25',
          category: 'Exfoliant',
          skinProblem: ['Acne', 'Blackheads', 'Pores'],
          price: 32.0,
          rating: 4.8,
          sold: 7500,
          affiliateLink: 'https://shopee.com/affiliate/104',
        },
        {
          id: '6',
          name: 'Hada Labo Gokujyun Hyaluronic Acid Lotion',
          imageUrl:
            'https://cf.shopee.co.id/file/dd143b95ef8a85369845c9e63db80a33',
          category: 'Toner',
          skinProblem: ['Dry Skin', 'Dehydration'],
          price: 14.5,
          rating: 4.9,
          sold: 25000,
          affiliateLink: 'https://shopee.com/affiliate/105',
        },
      ];

      // Filter by problem
      return mockProducts.filter((product) =>
        product.skinProblem.some(
          (p) => p.toLowerCase() === problem.toLowerCase(),
        ),
      );
    };

    // Watch for route changes to update products
    watch(() => props.tag, fetchProducts);

    onMounted(fetchProducts);

    return {
      products,
      filteredProducts,
      isLoading,
      formattedTag,
      isCurrentTag,
      priceMin,
      priceMax,
      selectedCategories,
      minRating,
      sortOption,
      categories,
      hasActiveFilters,
      getProblemDescription,
      applyFilters,
      sortProducts,
      resetFilters,
      searchQuery,
    };
  },
});
</script>

<style scoped>
.skin-problem-view {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f9f0f5;
}

.problem-header {
  text-align: center;
  margin-bottom: 2rem;
}

.problem-header h1 {
  font-size: 3rem;
  font-weight: 500;
  color: #ff6b9e;
  margin-bottom: 0.5rem;
}

.problem-header p {
  color: #666;
  font-size: 1.2rem;
}

.problem-content {
  display: flex;
  gap: 1.5rem;
}

.filters-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.filter-section {
  background-color: white;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-section h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  color: #333;
  text-align: center;
}

.filter-group {
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1.25rem;
}

.filter-group:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.filter-group h4 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
}

.search-input {
  margin-bottom: 0.5rem;
}

.search-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
  color: #333;
  width: 100%;
  height: 36px;
}

.search-input input:focus {
  outline: none;
  border-color: #ff6b9e;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.price-inputs input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
  color: #333;
  width: 100%;
  height: 36px;
}

.price-inputs input:focus {
  outline: none;
  border-color: #ff6b9e;
}

.checkbox-group,
.rating-filter {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-item,
.radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-item input,
.radio-item input {
  cursor: pointer;
}

.checkbox-item span,
.radio-item span {
  font-size: 0.9rem;
  color: #333;
}

.reset-filters {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: transparent;
  color: #ff6b9e;
  border: 1px solid #ff6b9e;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.reset-filters:hover {
  background-color: #ffe0ea;
}

.products-container {
  flex: 1;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sort-options span {
  font-weight: 500;
  color: #333;
}

.sort-options select {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #333;
  background-color: white;
}

.product-count {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.problem-banner {
  background-color: white;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  color: #333;
}

.problem-banner h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #ff6b9e;
}

.problem-banner p {
  font-size: 0.9rem;
  line-height: 1.5;
}

.loading {
  text-align: center;
  padding: 3rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ff6b9e;
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

.no-products {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.no-results-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.no-products h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-products p {
  margin-bottom: 1.5rem;
  color: #666;
}

.reset-filters-btn,
.back-home-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b9e;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
}

.reset-filters-btn:hover,
.back-home-btn:hover {
  background-color: #ff4785;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-3px);
}

.product-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 180px;
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
  transition: transform 0.2s;
}

.product-card:hover .product-image img {
  transform: scale(1.03);
}

.product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.product-rating {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.product-rating .stars {
  color: #f8a100;
  margin-right: 0.3rem;
}

.product-rating .rating-text {
  color: #666;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ff6b9e;
  margin-bottom: 0.5rem;
  margin-top: auto;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag {
  background-color: #f9f0f5;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  color: #ff6b9e;
}

.highlight-tag {
  background-color: #ff6b9e;
  color: white;
}

@media (max-width: 1024px) {
  .problem-content {
    flex-direction: column;
  }

  .filters-sidebar {
    width: 100%;
  }

  .filter-section {
    margin-bottom: 1.5rem;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .skin-problem-view {
    padding: 1rem;
  }

  .problem-header h1 {
    font-size: 2rem;
  }

  .sort-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .product-image {
    height: 160px;
  }
}

@media (min-width: 1280px) {
  .skin-problem-view {
    max-width: 1800px;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1600px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
