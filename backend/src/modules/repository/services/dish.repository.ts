import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DishEntity } from '../../../database/entities/dish.entity';
import { TableNameEnum } from '../../../database/entities/enums/table-name.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { DishesListReqDto } from '../../dish/models/dto/req/dishes-list.req.dto';

@Injectable()
export class DishRepository extends Repository<DishEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DishEntity, dataSource.manager);
  }

  public async getList(
    query: DishesListReqDto,
    userData: IUserData,
  ): Promise<[DishEntity[], number]> {
    const { limit = 10, offset = 0, categoryId, search, my = true } = query;

    if (!categoryId && !search) {
      return [[], 0];
    }

    const tableName = TableNameEnum.DISHES;
    const qb = this.createQueryBuilder(tableName);

    if (categoryId) {
      qb.andWhere(`${tableName}.categoryId = :categoryId`, { categoryId });
    }

    if (search) {
      qb.andWhere(
        `(LOWER(${tableName}.title) ILIKE :search OR LOWER(${tableName}.subtitle) ILIKE :search)`,
        { search: `%${search}%` },
      );
    }

    if (my) {
      qb.andWhere(`${tableName}.userId = :userId`, { userId: userData.userId });
    } else {
      qb.andWhere(`${tableName}.isConfident = false`);
    }

    qb.orderBy(`${tableName}.created`, 'DESC')
      .addOrderBy(`${tableName}.id`, 'ASC')
      .take(limit)
      .skip(offset);

    const [dishes, total] = await qb.getManyAndCount();

    return [dishes, total];
  }

  public async findDishById(id: string): Promise<DishEntity | null> {
    return await this.findOne({
      where: { id },
      relations: ['dishCategory', 'user'],
    });
  }

  public async deleteDishById(id: string): Promise<void> {
    await this.delete({ id });
  }
}
