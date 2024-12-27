import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DishCategoryEnum } from './enums/dish-category.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.DISHES)
export class DishEntity extends BaseEntity {
  @Column('boolean')
  isConfident: boolean;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  subtitle: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: DishCategoryEnum,
  })
  category: string;

  @Column('time', { nullable: true })
  preparationTime: number;

  @Column('smallint', { nullable: true })
  difficulty: number;

  @Column('jsonb')
  ingredient: {
    ingredientName: string;
    measure: {
      quantity: number;
      unit: string;
    };
  }[];

  @Column('text')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.dishes)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.dish)
  likes?: LikeEntity[];
}
