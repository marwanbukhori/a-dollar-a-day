import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';
@Injectable()
export class ProductService {
    productRepository;
    constructor(
    @InjectRepository(Product)
    productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.productRepository.find();
    }
    async findById(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findByCategory(category) {
        return this.productRepository.find({ where: { category } });
    }
    async findBySkinProblem(skinProblem) {
        return this.productRepository
            .createQueryBuilder('product')
            .where(':skinProblem = ANY(product.skinProblem)', { skinProblem })
            .getMany();
    }
    async create(createProductDto) {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }
    async update(id, updateProductDto) {
        const product = await this.findById(id);
        this.productRepository.merge(product, updateProductDto);
        return this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findById(id);
        await this.productRepository.remove(product);
    }
    async importFromExcel(file) {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);
        const products = [];
        for (const row of data) {
            const product = this.productRepository.create({
                name: row['Product Name'],
                category: row['Category'],
                skinProblem: row['Skin Problem']
                    .split(',')
                    .map((p) => p.trim()),
                price: parseFloat(row['Price']),
                rating: parseFloat(row['Rating']),
                sold: parseInt(row['Sold'], 10),
                affiliateLink: row['Affiliate Link'],
                imageUrl: row['Image URL'],
            });
            products.push(await this.productRepository.save(product));
        }
        return products;
    }
}
//# sourceMappingURL=product.service.js.map