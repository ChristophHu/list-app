import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
