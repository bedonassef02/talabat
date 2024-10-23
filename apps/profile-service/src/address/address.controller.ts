import { Controller } from '@nestjs/common';
import { AddressService } from './address.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfilePattern } from '@app/common/microservice/patterns/profile.pattern';
import { ParseMongoIdPipe } from '@app/common/pipes/parse-mongo-id.pipe';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern(ProfilePattern.GET_ADDRESS)
  findOne(@Payload(ParseMongoIdPipe) id: string) {
    return this.addressService.findOne(id);
  }

  @MessagePattern(ProfilePattern.UPDATE_ADDRESS)
  update(@Payload() addressDto: UpdateAddressDto) {
    return this.addressService.update(addressDto.user, addressDto);
  }
}
