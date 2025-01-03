import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class IngredientMeasureDto {
  @ApiProperty({ example: 1, description: 'Quantity of the ingredient' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unit of measure' })
  @IsString()
  unit: string;
}

export class IngredientDto {
  @IsString()
  @Length(1, 50)
  ingredientName: string;

  @ValidateNested()
  @Type(() => IngredientMeasureDto)
  measure: IngredientMeasureDto;
}

export class CreateDishDto {
  @IsBoolean()
  isConfident: boolean;

  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  title: string;

  @IsOptional()
  @IsString()
  @Length(3, 200)
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  image?: string;

  @IsString()
  @Length(3, 1000)
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  description: string;

  @IsOptional()
  @IsString()
  @Length(5, 200)
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  note?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  preparationTime?: number;

  @IsOptional()
  @IsInt()
  difficulty?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredient: IngredientDto[];

  @IsString()
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  userId: string;

  @IsString()
  @Transform(({ value }) => TransformHelper.trim(value))
  @Type(() => String)
  categoryId: string;
}
