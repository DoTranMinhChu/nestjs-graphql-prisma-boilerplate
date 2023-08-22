

import { applyDecorators, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QueryInfoPrismaDto } from './queryInfoPisma.dto';
export const QueryInfoPrisma = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.queryInfoPrisma ?? request.raw['queryInfoPrisma'];
  },
);


export const ApiQueryInfoPrisma = () =>
  applyDecorators(
    ApiQuery({
      type: QueryInfoPrismaDto
    }),
  )