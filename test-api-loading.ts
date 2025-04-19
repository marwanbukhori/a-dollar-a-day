#!/usr/bin/env node

const http = require('http');

// Endpoint to test
const endpoints = [
  { path: '/api/products', name: 'All Products' },
  { path: '/api/products/category/Serum', name: 'Serum Category' },
  { path: '/api/products/category/Toner', name: 'Toner Category' },
  { path: '/api/products/admin/test', name: 'API Health Check' },
];

console.log('Testing API endpoints...');

endpoints.forEach((endpoint) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: endpoint.path,
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const parsedData = JSON.parse(data);
        const count = Array.isArray(parsedData) ? parsedData.length : 1;
        console.log(
          `✅ ${endpoint.name}: Status ${res.statusCode}, Data Count: ${count}`,
        );
      } else {
        console.log(
          `❌ ${endpoint.name}: Status ${res.statusCode}, Error: ${data}`,
        );
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ ${endpoint.name}: ERROR - ${error.message}`);
  });

  req.end();
});
