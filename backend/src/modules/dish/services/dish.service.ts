import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { DishRepository } from '../../repository/services/dish.repository';
import { DishesListReqDto } from '../models/dto/req/dishes-list.req.dto';
import { DishListResDto } from '../models/dto/res/dish.res.dto';
import { DishMapper } from './dish.mapper';

@Injectable()
export class DishService {
  constructor(private readonly dishRepository: DishRepository) {}

  public async getAllDishes(
    query: DishesListReqDto,
    userData: IUserData,
  ): Promise<DishListResDto> {
    const [entities, total] = await this.dishRepository.getList(
      query,
      userData,
    );

    return DishMapper.toListResponseDto(entities, total, query);
  }

  public async deleteDish(id: string, userData: IUserData): Promise<void> {
    const dish = await this.dishRepository.findDishById(id);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }

    if (dish.userId !== userData.userId) {
      throw new ForbiddenException('You are not allowed to delete this dish');
    }
    await this.dishRepository.deleteDishById(id);
  }
}
