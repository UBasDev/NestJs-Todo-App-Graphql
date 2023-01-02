import { CustomRefreshTokenStrategy } from './strategies/custom-refresh-token.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { CustomLocalStrategy } from './strategies/custom-local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { CustomAccessTokenStrategy } from './strategies/custom-access-token.strategy';

@Module({
  imports: [PassportModule, UsersModule, JwtModule.register({})],
  providers: [
    AuthService,
    AuthResolver,
    CustomLocalStrategy,
    CustomAccessTokenStrategy,
    CustomRefreshTokenStrategy,
  ],
})
export class AuthModule {}
