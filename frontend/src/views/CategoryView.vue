<template>
  <div class="category-view">
    <div class="category-header">
      <h1>{{ categoryName }}</h1>
      <p>Browse our selection of {{ categoryName.toLowerCase() }} products</p>
    </div>

    <div v-if="isLoading" class="loading">
      <p>Loading products...</p>
    </div>

    <div v-else-if="products.length === 0" class="no-products">
      <p>No products found in this category.</p>
      <router-link to="/" class="back-link">Back to Home</router-link>
    </div>

    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <a
          :href="product.affiliateLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="product-image">
            <img :src="product.imageUrl" :alt="product.name" />
          </div>
          <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-category">{{ product.category }}</div>
            <div class="product-rating">
              ★ {{ product.rating.toFixed(1) }} | {{ product.sold }}+ sold
            </div>
            <div class="product-price">${{ product.price.toFixed(2) }}</div>
            <div class="product-tags">
              <span v-for="tag in product.skinProblem" :key="tag" class="tag">{{
                tag
              }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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
  name: 'CategoryView',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const products = ref<Product[]>([]);
    const isLoading = ref(true);

    const categoryName = computed(() => {
      // Format category name to look nicer (e.g., "cleanser" to "Cleanser")
      const name = props.name || '';
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    const fetchProducts = async () => {
      isLoading.value = true;

      try {
        const response = await axios.get(
          `/api/products/category/${props.name}`,
        );
        products.value = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback mock data if API fails
        products.value = getMockProductsByCategory(props.name);
      } finally {
        isLoading.value = false;
      }
    };

    // Mock data function to use if API fails
    const getMockProductsByCategory = (category: string): Product[] => {
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
          name: 'CeraVe Hydrating Cleanser',
          imageUrl:
            'https://cf.shopee.co.id/file/sg-11134201-23010-ztidc1ogxymv6f',
          category: 'Cleanser',
          skinProblem: ['Dry Skin', 'Sensitive'],
          price: 15.99,
          rating: 4.8,
          sold: 12500,
          affiliateLink: 'https://shopee.com/affiliate/102',
        },
        {
          id: '6',
          name: 'La Roche-Posay Anthelios Sunscreen SPF 50+',
          imageUrl:
            'https://cf.shopee.co.id/file/sg-11134201-23020-h3ftzkrjyunv13',
          category: 'Sunscreen',
          skinProblem: ['Sensitive', 'Protection'],
          price: 29.99,
          rating: 4.7,
          sold: 8900,
          affiliateLink: 'https://shopee.com/affiliate/103',
        },
      ];

      // Filter by lowercase category name for case-insensitive matching
      const lcCategory = category.toLowerCase();
      return mockProducts.filter(
        (product) => product.category.toLowerCase() === lcCategory,
      );
    };

    // Watch for route changes to update products
    watch(() => props.name, fetchProducts);

    onMounted(fetchProducts);

    return {
      products,
      isLoading,
      categoryName,
    };
  },
});
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.category-header {
  text-align: center;
  margin-bottom: 2rem;
}

.category-header h1 {
  font-size: 2.5rem;
  color: #ee4d2d;
  margin-bottom: 0.5rem;
}

.category-header p {
  color: #666;
  font-size: 1.1rem;
}

.loading,
.no-products {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.no-products p {
  margin-bottom: 1rem;
  color: #666;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #ee4d2d;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-details {
  padding: 1.2rem;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8rem;
}

.product-category {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.product-rating {
  color: #f8a100;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-weight: bold;
  color: #ee4d2d;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  color: #666;
}
</style>
