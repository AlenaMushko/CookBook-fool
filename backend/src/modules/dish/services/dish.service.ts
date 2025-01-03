import { Injectable } from '@nestjs/common';

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
}
