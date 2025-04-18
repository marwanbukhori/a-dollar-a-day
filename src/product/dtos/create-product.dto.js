import { IsString, IsNumber, IsArray, IsUrl, Min, Max, ArrayMinSize, } from 'class-validator';
export class CreateProductDto {
    @IsString()
    name;
    @IsUrl()
    imageUrl;
    @IsString()
    category;
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    skinProblem;
    @IsNumber()
    @Min(0)
    price;
    @IsNumber()
    @Min(0)
    @Max(5)
    rating;
    @IsNumber()
    @Min(0)
    sold;
    @IsUrl()
    affiliateLink;
}
//# sourceMappingURL=create-product.dto.js.map