import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_API = 'isAuthApi';
export const AuthApi = () => SetMetadata(IS_AUTH_API, true);