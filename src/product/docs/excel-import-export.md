# Excel Import/Export Documentation

## Overview

The Excel Import/Export system enables efficient management of product data through Microsoft Excel files. This documentation explains how to use these features to perform bulk operations on products.

## Endpoints

| Method | Endpoint                       | Description                | Response    |
| ------ | ------------------------------ | -------------------------- | ----------- |
| `GET`  | `/api/products/excel/template` | Download empty template    | Excel file  |
| `GET`  | `/api/products/excel/export`   | Export all products        | Excel file  |
| `POST` | `/api/products/excel/import`   | Import products from Excel | JSON status |

## Detailed Guide

### Downloading the Template

```bash
curl -X GET http://localhost:3000/api/products/excel/template -o template.xlsx
```

The template includes:

- Column headers matching required database fields
- Example data in row 2 showing expected formats
- Empty rows for adding your products

### Structure of the Excel File

The Excel template contains these columns:

| Column         | Data Type     | Required | Description                                      |
| -------------- | ------------- | -------- | ------------------------------------------------ |
| ID             | String (UUID) | \*       | Product unique identifier (required for updates) |
| Name           | String        | Yes      | Product name                                     |
| Category       | String        | Yes      | Product category (e.g., Cleanser, Toner)         |
| Brand          | String        | No       | Product brand name                               |
| Price          | Number        | Yes      | Product price                                    |
| Rating         | Number        | Yes      | Product rating (0-5)                             |
| Sold           | Number        | Yes      | Number of units sold                             |
| Image URL      | URL           | Yes      | Product image link                               |
| Affiliate Link | URL           | Yes      | Product purchase link                            |
| Skin Problems  | String        | No       | Comma-separated list of skin concerns            |
| Description    | Text          | No       | Detailed product description                     |
| Ingredients    | Text          | No       | List of ingredients                              |

\* ID is auto-generated for new products if left blank

### Filling the Template

1. Open the template in Microsoft Excel or compatible software
2. Keep the header row (row 1) unchanged
3. Replace the example row (row 2) with actual data or use it as reference
4. Add additional rows starting from row 3
5. Save as `.xlsx` format

**Important notes:**

- For **new products**: Leave the ID field blank (system will generate UUIDs)
- For **updating products**: Include the existing product ID
- Ensure all required fields have values
- Format skin problems as comma-separated text without spaces between commas

### Importing Products

```bash
curl -X POST http://localhost:3000/api/products/excel/import -F "file=@template.xlsx"
```

**Successful response:**

```json
{
  "status": "success",
  "message": "Successfully imported 10 out of 10 products",
  "total": 10,
  "saved": 10
}
```

The import process will:

- Create new products for rows without IDs
- Update existing products where IDs match
- Skip rows with invalid data
- Report success/failure counts

### Exporting Current Products

```bash
curl -X GET http://localhost:3000/api/products/excel/export -o products.xlsx
```

This is useful for:

- Making bulk updates to existing products
- Reviewing the current database
- Creating backups of product data

## Best Practices

1. **Workflow for Updates**

   - Export current products first
   - Make changes in the exported file
   - Import the modified file

2. **Data Validation**

   - Numbers should be numeric values without currency symbols
   - URLs should include http:// or https://
   - Skin Problems should be comma-separated without spaces

3. **Error Handling**
   - Invalid rows will be skipped
   - Import continues even if some rows fail
   - Check the response message for success/failure counts

## Troubleshooting

| Issue                     | Solution                                       |
| ------------------------- | ---------------------------------------------- |
| "File type not supported" | Save as .xlsx format (not CSV or other format) |
| "Missing required fields" | Check that all required columns have values    |
| "Import shows 0 products" | Verify you have data below row 2               |
| "Product not updated"     | Check that you included the correct ID         |

## Technical Implementation

For developers looking to extend this feature:

- Controller: `src/product/controllers/excel.controller.ts`
- Service: `src/product/excel.service.ts`
- DTO: `src/product/dto/import-product.dto.ts`

The implementation uses:

- ExcelJS for reading/writing Excel files
- TypeORM for database operations
- NestJS file upload with Multer
