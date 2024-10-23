import { Inject, Injectable } from '@nestjs/common';
import { UserPattern } from '@app/common/microservice/patterns/user.pattern';
import { Service } from '@app/common/microservice/enums/services.enum';
import { ClientProxy } from '@nestjs/microservices';
import { UserFieldsDto } from '../../../users-service/src/users/dto/user-fields.dto';
import { UpdateUserDto } from '../../../users-service/src/users/dto/update-user.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(Service.USERS) private readonly usersService: ClientProxy,
  ) {}

  findOne(id: string) {
    const fieldsDto: UserFieldsDto = { id, fields: ['id', 'address'] };
    return this.usersService.send(UserPattern.FIND_ONE, fieldsDto);
  }

  update(id: string, addressDto: UpdateAddressDto) {
    const userDto: UpdateUserDto = { id, address: addressDto };
    return this.usersService.send(UserPattern.UPDATE, userDto);
  }
}
