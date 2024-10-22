import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import userConfig from './users/config/user.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@app/common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(userConfig.asProvider()),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class UsersServiceModule {}
