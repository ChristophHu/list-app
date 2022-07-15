import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ItemModule } from './item/item.module';
import { JwtStrategy } from '../authentication/guards/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ListController],
  providers: [
    ListService,
    JwtStrategy
  ],
  imports: [
    ItemModule,
    ConfigModule,
    JwtModule,
    PassportModule
  ]
})
export class ListModule {}
