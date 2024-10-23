import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Service } from '@app/common/microservice/enums/services.enum';
import { ProfilePattern } from '@app/common/microservice/patterns/profile.pattern';
import { UpdateAddressDto } from '../../../profile-service/src/dto/update-address.dto';
import { ActiveUser } from '../../../auth-service/src/decorators/active-user.decorator';
import { Auth } from '../../../auth-service/src/authentication/decorators/auth.decorator';
import { AuthType } from '../../../auth-service/src/authentication/enums/auth-type.enum';
import { ActiveUserData } from '../../../auth-service/src/interfaces/active-user-data.interface';

@Auth(AuthType.Bearer)
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(Service.PROFILE) private readonly profileService: ClientProxy,
  ) {}

  @Get('address')
  getAddress(@ActiveUser('sub') userId: string) {
    return this.profileService.send(ProfilePattern.GET_ADDRESS, userId);
  }

  @Patch('address')
  updateAddress(
    @ActiveUser('sub') userId: string,
    @Body() addressDto: UpdateAddressDto,
  ) {
    addressDto.user = userId;
    return this.profileService.send(ProfilePattern.UPDATE_ADDRESS, addressDto);
  }
}
