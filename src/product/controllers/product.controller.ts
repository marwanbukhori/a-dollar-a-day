import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }

  @Get('skin-problem/:skinProblem')
  async findBySkinProblem(
    @Param('skinProblem') skinProblem: string,
  ): Promise<Product[]> {
    return this.productService.findBySkinProblem(skinProblem);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importProducts(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product[]> {
    return this.productService.importFromExcel(file);
  }

  // Simple health check endpoint for admin testing
  @Get('admin/test')
  async adminTest(): Promise<{ status: string; message: string }> {
    return {
      status: 'success',
      message: 'Product API is functioning correctly',
    };
  }
}
