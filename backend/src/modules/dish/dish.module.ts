import { Module } from '@nestjs/common';

import { DishController } from './dish.controller';
import { DishCategoryService } from './services/dish.category.service';
import { DishService } from './services/dish.service';

@Module({
  controllers: [DishController],
  providers: [DishService, DishCategoryService],
})
export class DishModule {}
