import { DishEntity } from '../../../database/entities/dish.entity';
import { DishesListReqDto } from '../models/dto/req/dishes-list.req.dto';
import {
  DishListResDto,
  DishResDto,
  ParsedDishResDto,
} from '../models/dto/res/dish.res.dto';

export class DishMapper {
  public static toResponseDto(entity: DishEntity): DishResDto {
    return {
      id: entity.id,
      isConfident: entity.isConfident,
      title: entity.title,
      subtitle: entity.subtitle,
      image: entity.image,
      description: entity.description,
      note: entity.note,
      preparationTime: entity.preparationTime,
      difficulty: entity.difficulty,
      ingredient: entity.ingredient.map((ingredient) => ({
        ingredientName: ingredient.ingredientName,
        measure: {
          quantity: ingredient.measure.quantity,
          unit: ingredient.measure.unit,
        },
      })),
      userId: entity.userId,
      categoryId: entity.categoryId,
      likesCount: entity.likesCount ?? 0,
    };
  }

  public static toListResponseDto(
    entities: DishEntity[],
    total: number,
    query: DishesListReqDto,
  ): DishListResDto {
    return {
      data: entities.map((entity) => this.toResponseDto(entity)),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }

  public static toParsedResponseDto(entity: DishEntity): ParsedDishResDto {
    return {
      ...this.toResponseDto(entity),
      user: {
        id: entity.user?.id,
        email: entity.user?.email,
        firstName: entity.user?.firstName,
        lastName: entity.user?.lastName,
      },
      dishCategory: {
        id: entity.dishCategory?.id,
        name: entity.dishCategory?.name,
      },
    };
  }
}
