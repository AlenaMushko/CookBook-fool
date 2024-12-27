import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DishEntity } from './dish.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.LIKES)
export class LikeEntity extends BaseEntity {
  @Column()
  dishId: string;
  @ManyToOne(() => DishEntity, (dish) => dish.likes)
  @JoinColumn({ name: 'dishId' })
  dish?: DishEntity;

  @Column()
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
