import { EAccountType } from '@common/enums/accountType.enum';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginType } from '@prisma/client';
export interface RequesterDTO {
    id: string,
    loginType: LoginType,
    type: EAccountType
}
export const Requester = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.requester;
    },
);