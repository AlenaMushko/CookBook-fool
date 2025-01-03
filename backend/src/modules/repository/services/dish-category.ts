import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DishCategoryEntity } from '../../../database/entities/dishCategory.entity';

@Injectable()
export class DishCategoryRepository extends Repository<DishCategoryEntity> {
  constructor(private readonly dataSources: DataSource) {
    super(DishCategoryEntity, dataSources.manager);
  }
}
