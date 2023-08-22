import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_OR_UNAUTH_API = 'isAuthOrUnauthApi';
export const AuthOrUnauthApi = () => SetMetadata(IS_AUTH_OR_UNAUTH_API, true);