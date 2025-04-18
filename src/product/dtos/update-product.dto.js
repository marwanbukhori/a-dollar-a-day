import { IsString, IsNumber, IsArray, IsUrl, IsOptional, Min, Max, ArrayMinSize, } from 'class-validator';
export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name;
    @IsOptional()
    @IsUrl()
    imageUrl;
    @IsOptional()
    @IsString()
    category;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    skinProblem;
    @IsOptional()
    @IsNumber()
    @Min(0)
    price;
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating;
    @IsOptional()
    @IsNumber()
    @Min(0)
    sold;
    @IsOptional()
    @IsUrl()
    affiliateLink;
}
//# sourceMappingURL=update-product.dto.js.map