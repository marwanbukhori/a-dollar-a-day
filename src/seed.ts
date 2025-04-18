import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './product/services/product.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const productService = app.get(ProductService);

  // Sample products data
  const sampleProducts = [
    {
      name: 'SOME BY MI AHA-BHA-PHA 30 Days Miracle Toner',
      imageUrl: 'https://cf.shopee.co.id/file/0eb9a7644282325ad7eddd169c5dd557',
      category: 'Toner',
      skinProblem: ['Acne', 'Oily Skin'],
      price: 16.99,
      rating: 4.8,
      sold: 5200,
      affiliateLink: 'https://shopee.com/affiliate/123',
    },
    {
      name: 'Cosrx Advanced Snail 96 Mucin Power Essence',
      imageUrl: 'https://cf.shopee.co.id/file/11bca5ea9dd59f39542e9c478d0a566f',
      category: 'Essence',
      skinProblem: ['Dry Skin', 'Sensitive'],
      price: 19.99,
      rating: 4.9,
      sold: 10500,
      affiliateLink: 'https://shopee.com/affiliate/456',
    },
    {
      name: 'Laneige Water Sleeping Mask',
      imageUrl: 'https://cf.shopee.co.id/file/e556b4d9e335da1d7111e2103d35ea96',
      category: 'Mask',
      skinProblem: ['Dry Skin', 'Dullness'],
      price: 25.0,
      rating: 4.7,
      sold: 8900,
      affiliateLink: 'https://shopee.com/affiliate/789',
    },
    {
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      imageUrl: 'https://cf.shopee.co.id/file/d8ec55ef59e8e78f64487fc34a44983e',
      category: 'Serum',
      skinProblem: ['Acne', 'Oily Skin', 'Pores'],
      price: 12.5,
      rating: 4.6,
      sold: 15600,
      affiliateLink: 'https://shopee.com/affiliate/101',
    },
    {
      name: "Paula's Choice 2% BHA Liquid Exfoliant",
      imageUrl: 'https://cf.shopee.co.id/file/sg-11134201-22110-9sz1d92s9ejv25',
      category: 'Exfoliant',
      skinProblem: ['Acne', 'Blackheads', 'Pores'],
      price: 32.0,
      rating: 4.8,
      sold: 7500,
      affiliateLink: 'https://shopee.com/affiliate/104',
    },
    {
      name: 'Hada Labo Gokujyun Hyaluronic Acid Lotion',
      imageUrl: 'https://cf.shopee.co.id/file/dd143b95ef8a85369845c9e63db80a33',
      category: 'Toner',
      skinProblem: ['Dry Skin', 'Dehydration'],
      price: 14.5,
      rating: 4.9,
      sold: 25000,
      affiliateLink: 'https://shopee.com/affiliate/105',
    },
    {
      name: 'Innisfree Green Tea Seed Serum',
      imageUrl: 'https://cf.shopee.co.id/file/sg-11134201-22120-a70rckkpyalve5',
      category: 'Serum',
      skinProblem: ['Dullness', 'Dry Skin'],
      price: 27.99,
      rating: 4.7,
      sold: 12300,
      affiliateLink: 'https://shopee.com/affiliate/106',
    },
    {
      name: 'Cerave Moisturizing Cream',
      imageUrl: 'https://cf.shopee.co.id/file/sg-11134201-22110-7lrqahjxugjv0d',
      category: 'Moisturizer',
      skinProblem: ['Dry Skin', 'Sensitive'],
      price: 16.75,
      rating: 4.8,
      sold: 34000,
      affiliateLink: 'https://shopee.com/affiliate/107',
    },
    {
      name: 'La Roche-Posay Effaclar Duo',
      imageUrl: 'https://cf.shopee.co.id/file/sg-11134201-22110-14tlw2cxshjv14',
      category: 'Treatment',
      skinProblem: ['Acne', 'Oily Skin'],
      price: 29.99,
      rating: 4.6,
      sold: 8200,
      affiliateLink: 'https://shopee.com/affiliate/108',
    },
    {
      name: 'SK-II Facial Treatment Essence',
      imageUrl: 'https://cf.shopee.co.id/file/sg-11134201-22110-0rjutfv5sgjv3a',
      category: 'Essence',
      skinProblem: ['Aging', 'Dullness', 'Pigmentation'],
      price: 99.99,
      rating: 4.9,
      sold: 5600,
      affiliateLink: 'https://shopee.com/affiliate/109',
    },
  ];

  console.log('Starting database seeding...');

  // Clear existing products
  await productService.deleteAll();
  console.log('Cleared existing products');

  // Insert sample products
  for (const product of sampleProducts) {
    await productService.create(product);
  }

  console.log(`Database seeded with ${sampleProducts.length} products.`);
  await app.close();
}

bootstrap()
  .then(() => {
    console.log('Seeding completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
