<template>
  <div class="product-form-container">
    <h2 class="form-title">
      {{ isEdit ? 'Edit Product' : 'Add New Product' }}
    </h2>
    <form class="product-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="sku">SKU</label>
        <input
          id="sku"
          v-model="formData.sku"
          type="text"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select
          id="category"
          v-model="formData.category"
          required
          class="form-control"
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Beauty">Beauty</option>
          <option value="Toys">Toys</option>
        </select>
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          v-model.number="formData.price"
          type="number"
          required
          min="0.01"
          step="0.01"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="stock">Stock</label>
        <input
          id="stock"
          v-model.number="formData.stock"
          type="number"
          required
          min="0"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select
          id="status"
          v-model="formData.status"
          required
          class="form-control"
        >
          <option value="Active">Active</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>

      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          v-model="formData.imageUrl"
          type="url"
          required
          class="form-control"
        />
      </div>

      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
        <button type="submit" class="submit-btn">
          {{ isEdit ? 'Update' : 'Add' }} Product
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  imageUrl: string;
}

export default defineComponent({
  name: 'ProductForm',
  props: {
    product: {
      type: Object as PropType<Product | null>,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const defaultFormData = {
      id: 0,
      name: '',
      sku: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'Active',
      imageUrl: '',
    };

    const formData = ref<Product>(
      props.product ? { ...props.product } : { ...defaultFormData },
    );

    const submitForm = (): void => {
      emit('submit', { ...formData.value });
    };

    const cancel = (): void => {
      emit('cancel');
    };

    return {
      formData,
      submitForm,
      cancel,
    };
  },
});
</script>

<style scoped>
.product-form-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.product-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #ee4d2d;
  outline: none;
}

.form-buttons {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #f2f2f2;
  color: #666;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  background-color: #ee4d2d;
  color: white;
}

.submit-btn:hover {
  background-color: #d04224;
}
</style>
