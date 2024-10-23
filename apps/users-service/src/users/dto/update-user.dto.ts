import {
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateAddressDto } from '../../../../profile-service/src/dto/update-address.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsMongoId()
  id: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}
