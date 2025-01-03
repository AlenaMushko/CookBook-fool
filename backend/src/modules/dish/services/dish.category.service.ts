import { Injectable } from '@nestjs/common';

import { DishCategoryRepository } from '../../repository/services/dish-category';
import { DishCategoryListResDto } from '../models/dto/res/dish.category.res.dto';
import { DishCategoryMapper } from './dish.category.mapper';

@Injectable()
export class DishCategoryService {
  constructor(
    private readonly dishCategoryRepository: DishCategoryRepository,
  ) {}

  public async getDishCategories(): Promise<DishCategoryListResDto> {
    const dishCategories = await this.dishCategoryRepository.find();
    if (!dishCategories || dishCategories.length === 0) {
      throw new Error('No dish categories found');
    }

    return DishCategoryMapper.toResDtoArray(dishCategories);
  }
}
