import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserAddress {
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
