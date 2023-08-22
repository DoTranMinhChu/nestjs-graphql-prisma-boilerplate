import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiQueryInfoPrisma,
  QueryInfoPrisma,
} from '@decorators/queryInfoPrisma/queryInfoPrisma.decorator';
import { QueryInfoPrismaDto } from '@decorators/queryInfoPrisma/queryInfoPisma.dto';
import { HttpPagingResponse } from '@decorators/response/httpPagingReponse.decorator';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQueryInfoPrisma()
  @HttpPagingResponse()
  async findAll(@QueryInfoPrisma() queryInfo: QueryInfoPrismaDto) {
    return await this.userService.findAndCountAll(queryInfo);
  }

  @Get(':id')
  @ApiQueryInfoPrisma()
  async findOneById(
    @Param('id') id: string,
    @QueryInfoPrisma() queryInfo: QueryInfoPrismaDto,
  ) {
    queryInfo.where = { ...queryInfo.where, id };
    return await this.userService.findOne(queryInfo);
  }
}
