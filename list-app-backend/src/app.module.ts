import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './modules/list/list.module';

@Module({
  imports: [
    // to .env
    ConfigModule.forRoot(),
    ListModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
