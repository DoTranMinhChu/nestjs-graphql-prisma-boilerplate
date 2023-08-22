import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import configuration from '@configs/configuration';
import { QueryPrismaMiddleware } from '@middlewares/queryPrisma.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '@filters/allException.filter';
import { AuthGuard } from '@guards/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AccountTypesGuard } from '@guards/auth/accountTypes.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphqlModule } from '@modules/graphql/graphql.module';
import { ApiModule } from '@modules/api/api.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      fieldResolverEnhancers: ['guards', 'filters', 'interceptors'],
    }),
    GraphqlModule,
    ApiModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: resolve(`./.env.${process.env['NODE_ENV']}`),
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryPrismaMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
