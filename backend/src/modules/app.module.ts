import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../config/configs';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './environments/local.env',
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    HealthModule,
    PostgresModule,
    RepositoryModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
