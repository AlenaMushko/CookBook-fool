import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSources: DataSource) {
    super(RefreshTokenEntity, dataSources.manager);
  }

  public async saveToken(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<RefreshTokenEntity> {
    return await this.save(
      this.create({
        deviceId: deviceId,
        userId: userId,
        refreshToken: token,
      }),
    );
  }

  public async isTokenExist(token: string): Promise<boolean> {
    const existingToken = await this.findOne({
      where: { refreshToken: token },
    });
    return !!existingToken;
  }
}
