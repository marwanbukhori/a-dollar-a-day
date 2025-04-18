<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return {
      currentYear,
    };
  },
});
</script>

<template>
  <div class="app">
    <main>
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} marwanbukhori.com</p>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f0f5;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

main {
  min-height: calc(100vh - 70px);
}

.footer {
  background-color: #f9f0f5;
  padding: 1.5rem 0;
  text-align: center;
  margin-top: 2rem;
  border-top: 1px solid #ffd6e7;
  color: #ff6b9e;
}

a {
  color: #ff6b9e;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #ff6b9e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ff4785;
}
</style>
