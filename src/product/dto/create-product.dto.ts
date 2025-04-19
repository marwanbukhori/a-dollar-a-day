import {
  IsString,
  IsNumber,
  IsArray,
  IsUrl,
  Min,
  Max,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  skinProblem?: string[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber()
  @Min(0)
  sold: number;

  @IsUrl()
  affiliateLink: string;
}
