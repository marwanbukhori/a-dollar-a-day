<template>
  <div class="about">
    <h1>About Shopee Admin Platform</h1>
    <div class="about-content">
      <section class="about-section">
        <h2>Our Platform</h2>
        <p>
          The Shopee Admin Platform is a comprehensive management solution for
          Shopee store owners, providing powerful tools to manage products,
          track orders, and analyze performance metrics all in one place.
        </p>
      </section>

      <section class="about-section">
        <h2>Key Features</h2>
        <ul class="feature-list">
          <li>
            <strong>Product Management:</strong> Easily add, edit, and remove
            products from your inventory with our intuitive interface.
          </li>
          <li>
            <strong>Order Processing:</strong> Track and manage customer orders
            from receipt to fulfillment.
          </li>
          <li>
            <strong>Analytics Dashboard:</strong> Get valuable insights into
            your store's performance with detailed reports and visualizations.
          </li>
          <li>
            <strong>Customer Management:</strong> Keep track of customer
            information and purchase history to improve service.
          </li>
          <li>
            <strong>Inventory Control:</strong> Monitor stock levels and receive
            notifications when inventory needs replenishing.
          </li>
        </ul>
      </section>

      <section class="about-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance with the platform, please
          don't hesitate to contact our support team.
        </p>
        <div class="contact-details">
          <p><strong>Email:</strong> support@shopeeadmin.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Hours:</strong> Monday to Friday, 9AM - 5PM EST</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutView',
});
</script>

<style scoped>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #ee4d2d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.about-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-section {
  margin-bottom: 2.5rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #ee4d2d;
  padding-bottom: 0.5rem;
  display: inline-block;
}

p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.feature-list {
  list-style-type: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.feature-list li:before {
  content: '•';
  color: #ee4d2d;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -0.3rem;
}

.contact-details {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid #ee4d2d;
}

.contact-details p {
  margin-bottom: 0.5rem;
}

.contact-details p:last-child {
  margin-bottom: 0;
}
</style>
