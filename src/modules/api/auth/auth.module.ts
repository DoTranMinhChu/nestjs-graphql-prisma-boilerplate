import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaRepository } from '@modules/prisma/repositories/prisma.repository';
import { UserRepository } from '@modules/prisma/repositories/user.repository';
import { AuthService } from './auth.service';
import { RefreshTokenUserRepository } from '@modules/prisma/repositories/refreshTokenUser.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleModule } from '@modules/google/google.module';

@Module({
  imports: [
    GoogleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          configService.get('server.secret') || 'secret',
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaRepository,
    UserRepository,
    RefreshTokenUserRepository,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
