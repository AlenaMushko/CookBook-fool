import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../user/models/dto/req/base-user.req.dto';

export class BaseAuthRequestDto extends PickType(BaseUserReqDto, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
