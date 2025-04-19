import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from './entities/product.entity';
import { ImportProductDto } from './dto/import-product.dto';

@Injectable()
export class ExcelService {
  private readonly logger = new Logger(ExcelService.name);

  /**
   * Creates a template Excel file for product data
   */
  async createTemplate(filePath?: string): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Name', key: 'name', width: 50 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Sold', key: 'sold', width: 10 },
      { header: 'Image URL', key: 'imageUrl', width: 50 },
      { header: 'Affiliate Link', key: 'affiliateLink', width: 50 },
      {
        header: 'Skin Problems (comma separated)',
        key: 'skinProblem',
        width: 30,
      },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Ingredients', key: 'ingredients', width: 50 },
    ];

    // Add styles to header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3D3D3' },
    };

    // Add instructions row
    worksheet.insertRow(2, {
      id: 'product_id',
      name: 'Product Name',
      category: 'Cleanser/Toner/Serum/Moisturizer/Mask/Sunscreen',
      brand: 'Brand Name',
      price: 0,
      rating: 0,
      sold: 0,
      imageUrl: 'https://example.com/image.jpg',
      affiliateLink: 'https://shopee.com.my/product',
      skinProblem: 'Acne,Dryness,Aging',
      description: 'Product description',
      ingredients: 'Ingredient list',
    });

    // Add styles to instruction row
    worksheet.getRow(2).font = { italic: true, color: { argb: 'FF808080' } };

    // Define output path
    let outputPath = filePath;
    if (!outputPath) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      outputPath = path.join(uploadsDir, `product_template_${Date.now()}.xlsx`);
    }

    // Write file
    await workbook.xlsx.writeFile(outputPath);
    this.logger.log(`Template created at: ${outputPath}`);

    return outputPath;
  }

  /**
   * Export products to Excel file
   */
  async exportProducts(
    products: Product[],
    filePath?: string,
  ): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Name', key: 'name', width: 50 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Brand', key: 'brand', width: 20 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Rating', key: 'rating', width: 10 },
      { header: 'Sold', key: 'sold', width: 10 },
      { header: 'Image URL', key: 'imageUrl', width: 50 },
      { header: 'Affiliate Link', key: 'affiliateLink', width: 50 },
      { header: 'Skin Problems', key: 'skinProblem', width: 30 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Ingredients', key: 'ingredients', width: 50 },
    ];

    // Add styles to header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD3D3D3' },
    };

    // Add data rows
    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        sold: product.sold,
        imageUrl: product.imageUrl,
        affiliateLink: product.affiliateLink,
        skinProblem: product.skinProblem ? product.skinProblem.join(',') : '',
        description: product.description,
        ingredients: product.ingredients,
      });
    });

    // Define output path
    let outputPath = filePath;
    if (!outputPath) {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      outputPath = path.join(uploadsDir, `products_export_${Date.now()}.xlsx`);
    }

    // Write file
    await workbook.xlsx.writeFile(outputPath);
    this.logger.log(`Exported ${products.length} products to: ${outputPath}`);

    return outputPath;
  }

  /**
   * Import products from Excel file
   */
  async importProducts(filePath: string): Promise<ImportProductDto[]> {
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException(`File not found: ${filePath}`);
    }

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new BadRequestException('Worksheet not found in Excel file');
      }

      const products: ImportProductDto[] = [];
      const headerRow = worksheet.getRow(1);
      const columnMap = new Map<string, number>();

      // Map column headers to their indices
      headerRow.eachCell((cell, colNumber) => {
        const header = cell.value?.toString().trim();
        if (header) {
          if (header === 'Skin Problems (comma separated)') {
            columnMap.set('skinProblem', colNumber);
          } else {
            columnMap.set(header.toLowerCase().replace(/ /g, ''), colNumber);
          }
        }
      });

      // Required columns check
      const requiredColumns = [
        'id',
        'name',
        'category',
        'price',
        'rating',
        'sold',
        'imageurl',
        'affiliatelink',
      ];
      const missingColumns = requiredColumns.filter(
        (col) => !columnMap.has(col),
      );

      if (missingColumns.length > 0) {
        throw new BadRequestException(
          `Missing required columns: ${missingColumns.join(', ')}`,
        );
      }

      // Process data rows (skip header and instruction rows)
      let rowNumber = 0;
      worksheet.eachRow((row, rowIdx) => {
        rowNumber = rowIdx;
        if (rowNumber <= 2) return; // Skip header and instruction rows

        try {
          const product: Record<string, any> = {};

          // Extract values for each column
          columnMap.forEach((colNumber, key) => {
            const cell = row.getCell(colNumber);
            const cellValue = cell.value;

            // Handle special cases based on key
            if (key === 'skinproblem' || key === 'skinProblem') {
              // Convert comma-separated string to array in product object
              if (cellValue && typeof cellValue === 'string') {
                product.skinProblem = cellValue
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean);
              } else {
                product.skinProblem = [];
              }
            } else if (key === 'price' || key === 'rating' || key === 'sold') {
              // Ensure numeric values
              if (typeof cellValue === 'number') {
                product[key] = cellValue;
              } else if (cellValue && typeof cellValue === 'string') {
                product[key] = parseFloat(cellValue) || 0;
              } else {
                product[key] = 0;
              }
            } else {
              // Map other string values
              const mappedKey =
                key === 'id'
                  ? 'id'
                  : key === 'name'
                    ? 'name'
                    : key === 'category'
                      ? 'category'
                      : key === 'brand'
                        ? 'brand'
                        : key === 'description'
                          ? 'description'
                          : key === 'ingredients'
                            ? 'ingredients'
                            : key === 'imageurl'
                              ? 'imageUrl'
                              : key === 'affiliatelink'
                                ? 'affiliateLink'
                                : key;

              product[mappedKey] = cellValue ? String(cellValue).trim() : '';
            }
          });

          // Only add non-empty rows with at least id and name
          if (product.id && product.name) {
            products.push(product as unknown as ImportProductDto);
          }
        } catch (error) {
          this.logger.warn(
            `Error processing row ${rowNumber}: ${error.message}`,
          );
        }
      });

      this.logger.log(`Imported ${products.length} products from Excel file`);
      return products;
    } catch (error) {
      this.logger.error(`Error importing Excel file: ${error.message}`);
      throw new BadRequestException(
        `Error importing Excel file: ${error.message}`,
      );
    }
  }
}
