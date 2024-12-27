import { Global, Module } from '@nestjs/common';

import { DishRepository } from './services/dish.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  DishRepository,
  LikeRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}