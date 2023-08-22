import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { QueryPrismaMiddleware } from '@middlewares/queryPrisma.middleware';
import { AuthModule } from '@modules/api/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '@filters/allException.filter';
import { AuthGuard } from '@guards/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AccountTypesGuard } from '@guards/auth/accountTypes.guard';
import { UserModule } from '@modules/api/user/user.module';
import { ChatModule } from '@modules/api/chat/chat.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ChatModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: resolve(`./.env.${process.env['NODE_ENV']}`),
      isGlobal: true,
      load: [configuration],
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountTypesGuard,
    },
  ],
  exports: [JwtModule],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryPrismaMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
