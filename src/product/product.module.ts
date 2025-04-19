import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ExcelController } from './controllers/excel.controller';
import { ExcelService } from './excel.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  ],
  controllers: [ProductController, ExcelController],
  providers: [ProductService, ExcelService],
  exports: [ProductService, ExcelService],
})
export class ProductModule {}
