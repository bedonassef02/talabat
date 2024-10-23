import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { SignUpDto } from 'apps/auth-service/src/authentication/dto/sign-up.dto';
import { UserFieldsDto } from './dto/user-fields.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  create(createUserDto: SignUpDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(fieldsDto: UserFieldsDto): Promise<User | null> {
    return this.userModel
      .findById(fieldsDto.id)
      .select(fieldsDto.fields.join(' '));
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
