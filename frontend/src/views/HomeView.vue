<template>
  <div class="home">
    <section class="hero">
      <h1>Find Your Perfect Skincare Products</h1>
      <p>
        Browse our curated selection of top-rated Shopee skincare products
        tailored to your unique skin concerns
      </p>
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for products, brands, or concerns..."
          @keyup.enter="search"
        />
        <button @click="search">Search</button>
      </div>
    </section>

    <section class="categories section-container">
      <h2>Browse by Category</h2>
      <div class="category-cards">
        <router-link to="/category/cleanser" class="category-card">
          <div class="category-icon">🧼</div>
          <h3>Cleansers</h3>
          <p>Gentle face washes for all skin types</p>
        </router-link>
        <router-link to="/category/toner" class="category-card">
          <div class="category-icon">💧</div>
          <h3>Toners</h3>
          <p>Balance and prep your skin</p>
        </router-link>
        <router-link to="/category/serum" class="category-card">
          <div class="category-icon">💉</div>
          <h3>Serums</h3>
          <p>Targeted treatments for specific concerns</p>
        </router-link>
        <router-link to="/category/moisturizer" class="category-card">
          <div class="category-icon">🧴</div>
          <h3>Moisturizers</h3>
          <p>Hydration for every skin type</p>
        </router-link>
        <router-link to="/category/mask" class="category-card">
          <div class="category-icon">😷</div>
          <h3>Masks</h3>
          <p>Weekly treatments for glowing skin</p>
        </router-link>
        <router-link to="/category/sunscreen" class="category-card">
          <div class="category-icon">☀️</div>
          <h3>Sunscreens</h3>
          <p>Essential protection from UV rays</p>
        </router-link>
      </div>
    </section>

    <section class="weekly-best">
      <h2>Weekly Best Selling</h2>
      <div class="product-grid">
        <div class="product-card">
          <a
            href="https://shopee.com/affiliate/345"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="product-image">
              <img
                src="https://cf.shopee.co.id/file/sg-11134201-22100-6d9hk6nfi5ivd1"
                alt="The Ordinary Niacinamide"
              />
              <div class="product-badge">TOP 1</div>
            </div>
            <div class="product-details">
              <h3 class="product-name">
                The Ordinary Niacinamide 10% + Zinc 1%
              </h3>
              <div class="product-category">Serum</div>
              <div class="product-rating">★★★★★ 4.9 | 18900+ sold</div>
              <div class="product-price">$11.99</div>
            </div>
          </a>
        </div>
        <div class="product-card">
          <a
            href="https://shopee.com/affiliate/678"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="product-image">
              <img
                src="https://cf.shopee.co.id/file/ed6f3a95240a8f839293c55c0bf9df0e"
                alt="Innisfree Green Tea Serum"
              />
              <div class="product-badge">TOP 2</div>
            </div>
            <div class="product-details">
              <h3 class="product-name">Innisfree Green Tea Seed Serum</h3>
              <div class="product-category">Serum</div>
              <div class="product-rating">★★★★★ 4.8 | 15200+ sold</div>
              <div class="product-price">$28.99</div>
            </div>
          </a>
        </div>
        <div class="product-card">
          <a
            href="https://shopee.com/affiliate/901"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="product-image">
              <img
                src="https://cf.shopee.co.id/file/d6d7b4439d3bd511358cdb63a57436bd"
                alt="COSRX Low pH Cleanser"
              />
              <div class="product-badge">TOP 3</div>
            </div>
            <div class="product-details">
              <h3 class="product-name">
                COSRX Low pH Good Morning Gel Cleanser
              </h3>
              <div class="product-category">Cleanser</div>
              <div class="product-rating">★★★★★ 4.7 | 14800+ sold</div>
              <div class="product-price">$13.99</div>
            </div>
          </a>
        </div>
        <div class="product-card">
          <a
            href="https://shopee.com/affiliate/234"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="product-image">
              <img
                src="https://cf.shopee.co.id/file/f3fb2e1a17e2f3f2f76bc069f72d13ed"
                alt="Neutrogena Hydro Boost"
              />
              <div class="product-badge">TOP 4</div>
            </div>
            <div class="product-details">
              <h3 class="product-name">Neutrogena Hydro Boost Water Gel</h3>
              <div class="product-category">Moisturizer</div>
              <div class="product-rating">★★★★★ 4.6 | 12300+ sold</div>
              <div class="product-price">$18.99</div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="brands section-container">
      <h2>Browse by Brands</h2>
      <div class="brand-cards">
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="COSRX" />
          </div>
          <h3>COSRX</h3>
        </div>
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="The Ordinary" />
          </div>
          <h3>The Ordinary</h3>
        </div>
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="Cetaphil" />
          </div>
          <h3>Cetaphil</h3>
        </div>
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="Laneige" />
          </div>
          <h3>Laneige</h3>
        </div>
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="SOME BY MI" />
          </div>
          <h3>SOME BY MI</h3>
        </div>
        <div class="brand-card">
          <div class="brand-logo">
            <img src="https://via.placeholder.com/120x60" alt="Innisfree" />
          </div>
          <h3>Innisfree</h3>
        </div>
      </div>
    </section>

    <section class="skin-problems section-container">
      <h2>Shop by Skin Concern</h2>
      <div class="problem-tags">
        <router-link to="/problem/acne" class="problem-tag">Acne</router-link>
        <router-link to="/problem/dry-skin" class="problem-tag"
          >Dry Skin</router-link
        >
        <router-link to="/problem/oily-skin" class="problem-tag"
          >Oily Skin</router-link
        >
        <router-link to="/problem/aging" class="problem-tag"
          >Anti-Aging</router-link
        >
        <router-link to="/problem/sensitive" class="problem-tag"
          >Sensitive Skin</router-link
        >
        <router-link to="/problem/pigmentation" class="problem-tag"
          >Pigmentation</router-link
        >
      </div>
    </section>

    <section
      v-if="featuredProducts.length > 0"
      class="featured-products section-container"
    >
      <h2>Top Rated Products</h2>
      <div class="product-grid">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="product-card"
        >
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
                ★★★★★ {{ product.rating.toFixed(1) }} | {{ product.sold }}+ sold
              </div>
              <div class="product-price">${{ product.price.toFixed(2) }}</div>
              <div class="product-tags">
                <span
                  v-for="tag in product.skinProblem"
                  :key="tag"
                  class="tag"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
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
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const featuredProducts = ref<Product[]>([]);
    const searchQuery = ref('');
    const isLoading = ref(false);

    const fetchFeaturedProducts = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get('/api/products');
        featuredProducts.value = response.data.slice(0, 8); // Show top 8 products
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if API fails
        featuredProducts.value = [
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
        ];
      } finally {
        isLoading.value = false;
      }
    };

    const search = () => {
      if (searchQuery.value.trim()) {
        router.push({
          path: '/search',
          query: { q: searchQuery.value },
        });
      }
    };

    onMounted(() => {
      fetchFeaturedProducts();
    });

    return {
      featuredProducts,
      searchQuery,
      isLoading,
      search,
    };
  },
});
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.hero {
  background: linear-gradient(135deg, #ffc1d5 0%, #ff6b9e 100%);
  border-radius: 12px;
  padding: 3rem;
  margin: 1.5rem 0 3rem;
  text-align: center;
  color: white;
  box-shadow: 0 4px 20px rgba(255, 107, 158, 0.15);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.search-box {
  display: flex;
  max-width: 550px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 1rem;
  background-color: white;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search-box button {
  background-color: #ff6b9e;
  color: white;
  border: none;
  border-radius: 0 50px 50px 0;
  padding: 0 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-box button:hover {
  background-color: #ff4785;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 2.5rem 0 1.5rem;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

h2:after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #ff6b9e;
  margin-left: 15px;
}

h2:before {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #ff6b9e;
  margin-right: 15px;
}

.section-container {
  margin-bottom: 3rem;
}

.category-cards,
.brand-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
}

.category-card,
.brand-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.category-card:hover,
.brand-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-card h3,
.brand-card h3 {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.category-card p {
  font-size: 0.85rem;
  color: #666;
}

.problem-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin: 1rem 0 3rem;
}

.problem-tag {
  background-color: #f6f6f6;
  color: #444;
  padding: 0.7rem 1.4rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.problem-tag:hover {
  background-color: #ff6b9e;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 107, 158, 0.2);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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

.product-card a {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  height: 200px;
  position: relative;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
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

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #ff6b9e;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(255, 107, 158, 0.2);
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
  margin-bottom: 0.8rem;
  margin-top: auto;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  font-size: 0.75rem;
  color: #666;
}

.brand-logo {
  height: 60px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.weekly-best {
  background-color: #fff5f9;
  border-radius: 12px;
  padding: 2.5rem;
  margin: 3rem 0;
  box-shadow: 0 4px 20px rgba(255, 107, 158, 0.1);
}

.weekly-best h2 {
  margin-top: 0;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .category-cards,
  .brand-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .category-cards,
  .brand-cards {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (min-width: 1280px) {
  .home {
    max-width: 1600px;
  }

  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
