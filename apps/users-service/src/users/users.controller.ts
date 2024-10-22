import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPattern } from '@app/common/microservice/patterns/user.pattern';
import { SignUpDto } from 'apps/auth-service/src/authentication/dto/sign-up.dto';
import { User } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserPattern.CREATE)
  create(@Payload() createUserDto: SignUpDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(UserPattern.FIND_ALL)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @MessagePattern(UserPattern.FIND_ONE)
  findOne(@Payload() id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @MessagePattern(UserPattern.FIND_BY_EMAIL)
  findByEmail(@Payload() email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern(UserPattern.UPDATE)
  update(@Payload() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(UserPattern.REMOVE)
  remove(@Payload() id: string): Promise<User | null> {
    return this.usersService.remove(id);
  }
}
