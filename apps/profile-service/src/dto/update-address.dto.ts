import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  user: string;
  @IsOptional()
  @IsString()
  street: string;
  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsString()
  country: string;
}
