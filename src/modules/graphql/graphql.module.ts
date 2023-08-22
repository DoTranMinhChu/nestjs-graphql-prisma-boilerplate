import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '@filters/allException.filter';
import { AuthGuard } from '@guards/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AccountTypesGuard } from '@guards/auth/accountTypes.guard';
import { UserModule } from './user/user.module';
import { GraphqlAuthGuard } from '@guards/graphqlAuth/graphqlAuth.guard';
import { GraphqlAccountTypesGuard } from '@guards/graphqlAuth/graphqlAccountTypes.guard';

@Module({
  imports: [
    UserModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: resolve(`./.env.${process.env['NODE_ENV']}`),
      isGlobal: true,
      load: [configuration],
    }),
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
      useClass: GraphqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GraphqlAccountTypesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountTypesGuard,
    },
  ],
})
export class GraphqlModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(QueryPrismaMiddleware)
    //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
