<template>
  <div class="product-form-view">
    <div class="header">
      <div class="back-link">
        <router-link to="/products">
          <span class="back-icon">←</span> Back to Products
        </router-link>
      </div>
      <h1>{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h1>
    </div>

    <ProductForm
      :product="product"
      :isEdit="isEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductForm, { Product } from '../components/ProductForm.vue';

export default defineComponent({
  name: 'ProductFormView',
  components: {
    ProductForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref<Product | null>(null);

    const isEdit = computed((): boolean => {
      return route.params.id !== undefined;
    });

    onMounted(async (): Promise<void> => {
      if (isEdit.value) {
        // In a real app, fetch product data from API
        // For now, we'll simulate fetching with mock data
        const productId = parseInt(route.params.id as string);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Mock data for demonstration
        product.value = {
          id: productId,
          name: 'Sample Product',
          sku: 'SKU' + productId,
          category: 'Electronics',
          price: 199.99,
          stock: 25,
          status: 'Active',
          imageUrl: 'https://via.placeholder.com/150',
        };
      }
    });

    const handleSubmit = (formData: Product): void => {
      // In a real app, save to API
      console.log('Form submitted:', formData);

      // Simulate API call
      setTimeout(() => {
        // Redirect back to products list after saving
        router.push('/products');
      }, 500);
    };

    const handleCancel = (): void => {
      router.push('/products');
    };

    return {
      product,
      isEdit,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style scoped>
.product-form-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.back-link {
  margin-bottom: 1rem;
}

.back-link a {
  display: inline-flex;
  align-items: center;
  color: #ee4d2d;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #d04224;
}

.back-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

h1 {
  color: #333;
  font-size: 1.8rem;
  margin: 0;
}
</style>
