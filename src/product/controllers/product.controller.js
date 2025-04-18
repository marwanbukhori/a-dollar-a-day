import { Controller, Get, Post, Delete, Put, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    @Get()
    async findAll() {
        return this.productService.findAll();
    }
    @Get(':id')
    async findOne(
    @Param('id', ParseUUIDPipe)
    id) {
        return this.productService.findById(id);
    }
    @Get('category/:category')
    async findByCategory(
    @Param('category')
    category) {
        return this.productService.findByCategory(category);
    }
    @Get('skin-problem/:skinProblem')
    async findBySkinProblem(
    @Param('skinProblem')
    skinProblem) {
        return this.productService.findBySkinProblem(skinProblem);
    }
    @Post()
    async create(
    @Body()
    createProductDto) {
        return this.productService.create(createProductDto);
    }
    @Put(':id')
    async update(
    @Param('id', ParseUUIDPipe)
    id, 
    @Body()
    updateProductDto) {
        return this.productService.update(id, updateProductDto);
    }
    @Delete(':id')
    async remove(
    @Param('id', ParseUUIDPipe)
    id) {
        return this.productService.remove(id);
    }
    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    async importProducts(
    @UploadedFile()
    file) {
        return this.productService.importFromExcel(file);
    }
    // Simple health check endpoint for admin testing
    @Get('admin/test')
    async adminTest() {
        return {
            status: 'success',
            message: 'Product API is functioning correctly',
        };
    }
}
//# sourceMappingURL=product.controller.js.map