import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from '../../repository/services/user.repository';
import { CreateUserDto } from '../models/dto/req/create-user.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    return 'This action adds a new user';
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  public async findOne(id: number): Promise<string> {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserReqDto,
  ): Promise<string> {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }
}
