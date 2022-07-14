import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/authentication/auth.module';
// import { AtGuard } from './modules/authentication/guards/at.guard';
import { ListModule } from './modules/list/list.module';

@Module({
  imports: [
    // to .env
    ConfigModule.forRoot(),
    AuthModule,
    ListModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // }
  ]
})
export class AppModule {}
