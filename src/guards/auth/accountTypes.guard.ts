import { EAccountType } from '@common/enums/accountType.enum';
import { ACCOUNT_TYPE } from '@decorators/auth/accountType.decorator';
import { RequesterDTO } from '@decorators/auth/requester.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class AccountTypesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const accountTypes: any = this.reflector.get<EAccountType>(ACCOUNT_TYPE, context.getHandler());
    
        if (!accountTypes) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const requester = request.requester as RequesterDTO;
        return accountTypes.includes(requester.type);
    }
}