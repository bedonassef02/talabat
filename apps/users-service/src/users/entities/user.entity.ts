import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from '../enums/role.enum';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
