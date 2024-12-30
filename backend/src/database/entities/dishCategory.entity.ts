import { Column, Entity, OneToMany } from 'typeorm';

import { DishEntity } from './dish.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.DISH_CATEGORIES)
export class DishCategoryEntity extends BaseEntity {
  @Column('text')
  name: string;

  @OneToMany(() => DishEntity, (dish) => dish.categoryId)
  dishes?: DishEntity[];
}
