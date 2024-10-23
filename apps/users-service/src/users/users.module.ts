import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import userConfig from './config/user.config';
import { ConfigModule } from '@nestjs/config';
import { UserAddress, UserAddressSchema } from './entities/user-address.entity';

@Module({
  imports: [
    ConfigModule.forFeature(userConfig),
    MongooseModule.forRootAsync(userConfig.asProvider()),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAddress.name, schema: UserAddressSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
