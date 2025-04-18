<template>
  <div class="admin">
    <h1>Admin Dashboard</h1>
    <div class="admin-panel">
      <div class="sidebar">
        <ul class="nav-menu">
          <li class="nav-item active">Dashboard</li>
          <li class="nav-item">Products</li>
          <li class="nav-item">Orders</li>
          <li class="nav-item">Customers</li>
          <li class="nav-item">Settings</li>
        </ul>
      </div>
      <div class="main-content">
        <div class="stats-cards">
          <div class="stat-card">
            <h3>Total Sales</h3>
            <p class="stat">$24,500</p>
            <span class="trend positive">↑ 12%</span>
          </div>
          <div class="stat-card">
            <h3>Orders</h3>
            <p class="stat">156</p>
            <span class="trend positive">↑ 8%</span>
          </div>
          <div class="stat-card">
            <h3>Products</h3>
            <p class="stat">428</p>
            <span class="trend neutral">→ 0%</span>
          </div>
          <div class="stat-card">
            <h3>Customers</h3>
            <p class="stat">2,105</p>
            <span class="trend positive">↑ 5%</span>
          </div>
        </div>
        <div class="recent-activity">
          <h2>Recent Activity</h2>
          <table class="activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-06-28</td>
                <td>#2345</td>
                <td>John Smith</td>
                <td><span class="status completed">Completed</span></td>
                <td>$125.00</td>
              </tr>
              <tr>
                <td>2023-06-28</td>
                <td>#2344</td>
                <td>Sarah Johnson</td>
                <td><span class="status processing">Processing</span></td>
                <td>$89.50</td>
              </tr>
              <tr>
                <td>2023-06-27</td>
                <td>#2343</td>
                <td>Michael Wong</td>
                <td><span class="status completed">Completed</span></td>
                <td>$234.99</td>
              </tr>
              <tr>
                <td>2023-06-27</td>
                <td>#2342</td>
                <td>Rebecca Lee</td>
                <td><span class="status processing">Processing</span></td>
                <td>$45.75</td>
              </tr>
              <tr>
                <td>2023-06-26</td>
                <td>#2341</td>
                <td>David Chen</td>
                <td><span class="status canceled">Canceled</span></td>
                <td>$78.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminView',
});
</script>

<style scoped>
.admin {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.admin-panel {
  display: flex;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar {
  width: 200px;
  background-color: #ee4d2d;
  color: white;
  padding: 1.5rem 0;
}

.nav-menu {
  list-style: none;
  padding: 0;
}

.nav-item {
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  padding: 1.5rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.trend {
  font-size: 0.9rem;
  font-weight: 500;
}

.trend.positive {
  color: #28a745;
}

.trend.negative {
  color: #dc3545;
}

.trend.neutral {
  color: #6c757d;
}

.recent-activity {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.recent-activity h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
}

.activity-table th,
.activity-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.activity-table th {
  font-weight: 600;
  color: #666;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status.completed {
  background-color: #e6f7ee;
  color: #28a745;
}

.status.processing {
  background-color: #e6f0f9;
  color: #0d6efd;
}

.status.canceled {
  background-color: #f8e6e6;
  color: #dc3545;
}
</style>
