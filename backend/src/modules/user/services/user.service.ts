import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

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
    updateUserDto: Partial<UpdateUserReqDto>,
  ): Promise<UserResDto> {
    const user = await this.findByIdOrThrow(id);

    if (!updateUserDto.password) {
      throw new UnprocessableEntityException('Password is required');
    }
    const newPassword = await bcrypt.hash(updateUserDto.password, 10);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
      password: newPassword,
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
