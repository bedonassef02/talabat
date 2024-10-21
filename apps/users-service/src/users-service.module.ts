import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import userConfig from './users/config/user.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(userConfig.asProvider()),
    UsersModule,
  ],
})
export class UsersServiceModule {}
