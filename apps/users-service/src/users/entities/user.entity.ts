import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from '../enums/role.enum';
import { UserAddress } from './user-address.entity';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.Regular })
  role: Role;

  @Prop()
  address: UserAddress;
}

export const UserSchema = SchemaFactory.createForClass(User);
