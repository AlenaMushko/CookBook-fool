import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get(':id')
  public async findUserById(@Param('id') id: string): Promise<UserResDto> {
    return await this.userService.findUserById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserReqDto>,
  ): Promise<UserResDto> {
    return await this.userService.update(id, updateUserDto);
  }
}
