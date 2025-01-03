import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DishEntity } from '../../../database/entities/dish.entity';
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
    const { limit = 10, offset = 0, categoryId, search } = query;

    const qb = this.createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishCategory', 'dishCategory')
      .leftJoinAndSelect('dish.user', 'user')
      .loadRelationCountAndMap('dish.likesCount', 'dish.likes', 'like', (qb) =>
        qb.andWhere('like.userId <> :myId', { myId: userData.userId }),
      );
    //     qb.leftJoin('dish.likes', 'like', 'like.userId <> :myId');
    //     qb.setParameter('myId', userData.userId);
    //
    //     qb.addSelect('COUNT(like.id)', 'dish_likesCount');
    //
    //     dishes.forEach((dish: any) => {
    //       dish.likesCount = Number(dish.dish_likesCount);
    //       delete dish.dish_likesCount;
    //     });
    if (categoryId) {
      qb.andWhere('dish.categoryId = :categoryId', { categoryId });
    }

    if (search) {
      qb.andWhere(
        'LOWER(dish.title) LIKE :search OR LOWER(dish.subtitle) LIKE :search',
      );
      qb.setParameter('search', `%${search.toLowerCase()}%`);
    }

    qb.orderBy('dish.created', 'DESC')
      .addOrderBy('dish.id', 'ASC')
      .take(limit)
      .skip(offset);

    const [dishes, total] = await qb.getManyAndCount();

    return [dishes, total];
  }
}
