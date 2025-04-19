import {
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
  IsArray,
} from 'class-validator';

export class ImportProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsArray()
  skinProblem?: string[];

  @IsNumber()
  price: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  sold: number;

  @IsUrl()
  affiliateLink: string;
}
