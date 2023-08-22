import { RegisterInAppRequest } from '@common/requests/auth/registerInApp.request';
import { Body, Controller, Get, Post } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponse } from '@common/responses/auth/login.response';
import { BadRequestException } from '@exceptions/badRequest.exception';
import { LoginInAppRequest } from '@common/requests/auth/loginInApp.request';
import { LoginSNSRequest } from '@common/requests/auth/loginSNS.request';
import { AuthApi } from '@decorators/auth/auth.decorator';
import { Requester, RequesterDTO } from '@decorators/auth/requester.decorator';
import { AccountType } from '@decorators/auth/accountType.decorator';
import { EAccountType } from '@common/enums/accountType.enum';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiOkResponse({
    type: LoginResponse,
    description: 'Register success reponse',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Bad Request Exception.',
  })
  async userRegisterInApp(
    @Body() registerInAppRequest: RegisterInAppRequest,
  ): Promise<LoginResponse> {
    return await this.authService.userRegisterInApp(registerInAppRequest);
  }

  @Post('login')
  @ApiOperation({ summary: 'Register User' })
  @ApiOkResponse({
    type: LoginResponse,
    description: 'Register success reponse',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Bad Request Exception.',
  })
  async userLoginInApp(
    @Body() loginInAppRequest: LoginInAppRequest,
  ): Promise<LoginResponse> {
    return await this.authService.userLoginInApp(loginInAppRequest);
  }

  @Post('login-sns')
  @ApiOperation({ summary: 'Register User' })
  @ApiOkResponse({
    type: LoginResponse,
    description: 'Register success reponse',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Bad Request Exception.',
  })
  async userLoginSNS(
    @Body() loginSNSRequest: LoginSNSRequest,
  ): Promise<LoginResponse> {
    return await this.authService.userLoginSNS(loginSNSRequest);
  }

  @Get('info')
  @AuthApi()
  @AccountType([EAccountType.USER])
  @ApiBearerAuth()
  async getInfo(@Requester() requester: RequesterDTO) {
    return await this.authService.getInfo(requester);
  }
}
