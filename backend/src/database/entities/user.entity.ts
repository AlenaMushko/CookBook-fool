import { Column, Entity, OneToMany } from 'typeorm';

import { DishEntity } from './dish.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseEntity {
  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { nullable: true })
  phone?: string;

  @OneToMany(() => DishEntity, (dish) => dish.user)
  dishes?: DishEntity[];

  @OneToMany(() => RefreshTokenEntity, (token) => token.user)
  token?: RefreshTokenEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes?: LikeEntity[];
}
