import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';

import { CreateDishDto } from './create-dish.dto';

export class UpdateDishReqDto extends PartialType(CreateDishDto) {
  @IsUUID()
  id: string;
}
