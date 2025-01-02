import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DishEntity } from '../../../database/entities/dish.entity';

@Injectable()
export class DishRepository extends Repository<DishEntity> {
  constructor(private readonly dataSources: DataSource) {
    super(DishEntity, dataSources.manager);
  }
}
