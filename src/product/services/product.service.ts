import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import * as xlsx from 'xlsx';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productRepository.find({ where: { category } });
  }

  async findBySkinProblem(skinProblem: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .where(':skinProblem = ANY(product.skinProblem)', { skinProblem })
      .getMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findById(id);
    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findById(id);
    await this.productRepository.remove(product);
  }

  async importFromExcel(file: Express.Multer.File): Promise<Product[]> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const products: Product[] = [];

    for (const row of data) {
      const typedRow = row as Record<string, any>;
      const product = this.productRepository.create({
        name: typedRow['Product Name'],
        category: typedRow['Category'],
        skinProblem: typedRow['Skin Problem']
          .split(',')
          .map((p: string) => p.trim()),
        price: parseFloat(typedRow['Price']),
        rating: parseFloat(typedRow['Rating']),
        sold: parseInt(typedRow['Sold'], 10),
        affiliateLink: typedRow['Affiliate Link'],
        imageUrl: typedRow['Image URL'],
      });

      products.push(await this.productRepository.save(product));
    }

    return products;
  }
}
