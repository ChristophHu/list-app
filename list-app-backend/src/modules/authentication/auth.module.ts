import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { LocalStrategy } from './guards/local.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'at-secret',
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
    ConfigModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
