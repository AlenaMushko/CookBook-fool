import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserReqDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;
}
