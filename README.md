![image](https://github.com/user-attachments/assets/ef786988-6440-4701-a8c2-a26939009a4b)

# Shopee Affiliate Platform

A web application for showcasing recommended products for different skin problems, built with NestJS and Vue.

## Features

- Browse products by skin problem category
- Filter products by price, category, and rating
- Sort products by popularity, price, or rating
- Responsive design for various screen sizes
- Admin interface for managing products

## Tech Stack

### Backend

- NestJS
- TypeORM
- PostgreSQL
- Passport.js (for auth)

### Frontend

- Vue 3 (Composition API)
- Vite
- Pinia (state management)
- Vue Router

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database for the application:

```sql
CREATE DATABASE shopee_affiliate;
```

3. Create a user with appropriate permissions:

```sql
CREATE USER shopee_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE shopee_affiliate TO shopee_user;
```

### Environment Configuration

1. Clone the repository
2. Copy the `.env.example` file to `.env` and update the database connection settings:

```
NODE_ENV=development
PORT=3000

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=shopee_affiliate
```

### Installation

1. Install dependencies for both the backend and frontend:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install
```

### Database Initialization

Seed the database with sample products:

```bash
npm run db:seed
```

## Running the Application

### Development Mode

Run both the frontend and backend in development mode:

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:3000
- Frontend dev server on http://localhost:5173

The frontend will proxy API requests to the backend automatically.

### Production Mode

Build and run the application for production:

```bash
npm run build:full
npm run start:prod
```

This will:

1. Build the backend
2. Build the frontend
3. Serve the frontend as static files from the backend

The application will be available at http://localhost:3000.

## API Documentation

The API endpoints are available at `/api`:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/skin-problem/:problem` - Get products by skin problem

## Development

### Running Only Backend

```bash
npm run dev:backend
```

### Running Only Frontend

```bash
npm run dev:frontend
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Product Management System: Excel Import/Export

## Overview

This module provides Excel import/export functionality for managing product data. It allows bulk operations (create/update) through familiar spreadsheet interfaces.

## API Endpoints

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| `GET`  | `/api/products/excel/template` | Download empty template    |
| `GET`  | `/api/products/excel/export`   | Export all products        |
| `POST` | `/api/products/excel/import`   | Import products from Excel |

## Quick Start

### 1. Download Template

```bash
curl -X GET http://localhost:3000/api/products/excel/template -o template.xlsx
```

### 2. Fill Template with Product Data

Open `template.xlsx` in Excel and:

- Keep row 1 (headers) unchanged
- Fill rows with product data (starting from row 3)
- Save as .xlsx format

Required fields:

- Name
- Category
- Price
- Rating
- Sold
- Image URL
- Affiliate Link

### 3. Import Products

```bash
curl -X POST http://localhost:3000/api/products/excel/import -F "file=@template.xlsx"
```

### 4. Export Current Products

```bash
curl -X GET http://localhost:3000/api/products/excel/export -o products.xlsx
```

## Data Structure

| Column         | Data Type     | Required | Description                                        |
| -------------- | ------------- | -------- | -------------------------------------------------- |
| ID             | String (UUID) | \*       | Product unique identifier (auto-generated for new) |
| Name           | String        | Yes      | Product name                                       |
| Category       | String        | Yes      | Product category (e.g. Cleanser, Toner)            |
| Brand          | String        | No       | Product brand name                                 |
| Price          | Number        | Yes      | Product price                                      |
| Rating         | Number        | Yes      | Product rating (0-5)                               |
| Sold           | Number        | Yes      | Number of units sold                               |
| Image URL      | URL           | Yes      | Product image link                                 |
| Affiliate Link | URL           | Yes      | Product purchase link                              |
| Skin Problems  | String        | No       | Comma-separated list of skin concerns              |
| Description    | Text          | No       | Detailed product description                       |
| Ingredients    | Text          | No       | List of ingredients                                |

## Tips for Success

1. **Creating vs Updating**:

   - To create new products: Leave ID blank
   - To update existing products: Use current product IDs

2. **Special Fields**:

   - Skin Problems: Use comma-separated values (e.g., "Acne,Dryness,Oily Skin")
   - URLs: Include http:// or https://

3. **Workflow Example**:

   - Download current products (`/api/products/excel/export`)
   - Make changes in Excel
   - Import updated file (`/api/products/excel/import`)

4. **Troubleshooting**:
   - Verify all required fields are populated
   - Check data format (numbers for numeric fields)
   - Ensure file is saved as .xlsx format

## Example Response

Successful import:

```json
{
  "status": "success",
  "message": "Successfully imported 5 out of 5 products",
  "total": 5,
  "saved": 5
}
```
