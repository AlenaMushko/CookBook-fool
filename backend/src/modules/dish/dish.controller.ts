import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { DishesListReqDto } from './models/dto/req/dishes-list.req.dto';
import { DishListResDto, DishResDto } from './models/dto/res/dish.res.dto';
import { DishCategoryService } from './services/dish.category.service';
import { DishService } from './services/dish.service';

@ApiBearerAuth()
@ApiTags('Dish')
@Controller('dish')
export class DishController {
  constructor(
    private readonly dishCategoryService: DishCategoryService,
    private readonly dishService: DishService,
  ) {}

  @Get('categories')
  public async getDishCategories() {
    return await this.dishCategoryService.getDishCategories();
  }

  @Get()
  public async getAllDishes(
    @Query() query: DishesListReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<DishListResDto> {
    return await this.dishService.getAllDishes(query, userData);
  }

  @Get(':id')
  public async getDishById(@Param('id') id: string): Promise<DishResDto> {
    return await this.dishService.getDishById(id);
  }

  @Delete(':id')
  public async deleteDish(
    @Param('id') id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    return await this.dishService.deleteDish(id, userData);
  }
}
