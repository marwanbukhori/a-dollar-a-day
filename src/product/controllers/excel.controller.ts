import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExcelService } from '../excel.service';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products/excel')
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    private readonly productService: ProductService,
  ) {}

  @Get('template')
  async downloadTemplate(@Res() res: Response): Promise<void> {
    const filePath = await this.excelService.createTemplate();
    res.download(filePath);
  }

  @Get('export')
  async exportProducts(@Res() res: Response): Promise<void> {
    const products = await this.productService.findAll();
    const filePath = await this.excelService.exportProducts(products);
    res.download(filePath);
  }

  @Post('import')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `products-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async importProducts(@UploadedFile() file: Express.Multer.File): Promise<{
    status: string;
    message: string;
    total: number;
    saved: number;
  }> {
    try {
      // Import products from Excel
      const products = await this.excelService.importProducts(file.path);

      // Save imported products to database
      let saved = 0;
      for (const product of products) {
        try {
          // Check if product exists for update
          let existingProduct;
          try {
            existingProduct = await this.productService.findById(product.id);
          } catch {
            // Product doesn't exist, will create new
            existingProduct = null;
          }

          if (existingProduct) {
            await this.productService.update(product.id, product);
          } else {
            // Convert to CreateProductDto format
            const productToCreate: CreateProductDto = {
              name: product.name,
              imageUrl: product.imageUrl,
              category: product.category,
              skinProblem: product.skinProblem || [],
              price: product.price,
              rating: product.rating,
              sold: product.sold,
              affiliateLink: product.affiliateLink,
            };
            await this.productService.create(productToCreate);
          }
          saved++;
        } catch (error) {
          console.error(
            `Error saving product ${product.name}: ${error.message}`,
          );
        }
      }

      return {
        status: 'success',
        message: `Successfully imported ${saved} out of ${products.length} products`,
        total: products.length,
        saved,
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Import failed: ${error.message}`,
        total: 0,
        saved: 0,
      };
    }
  }
}
