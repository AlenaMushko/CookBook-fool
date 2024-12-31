import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUserById(id: string): Promise<UserResDto> {
    const user = await this.findByIdOrThrow(id);
    return UserMapper.toResDto(user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.findByIdOrThrow(id);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return UserMapper.toResDto(updatedUser);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }

  public async findByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
}
