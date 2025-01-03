import { DishCategoryEntity } from '../../../database/entities/dishCategory.entity';
import {
  DishCategoryListResDto,
  DishCategoryResDto,
} from '../models/dto/res/dish.category.res.dto';

export class DishCategoryMapper {
  public static toResDto(dishCategory: DishCategoryEntity): DishCategoryResDto {
    if (!dishCategory.id || !dishCategory.name) {
      throw new Error('Missing required fields: id or name');
    }

    return {
      id: dishCategory.id,
      name: dishCategory.name,
    };
  }

  public static toResDtoArray(
    dishCategories: DishCategoryEntity[],
  ): DishCategoryListResDto {
    return { data: dishCategories.map(this.toResDto) };
  }
}
