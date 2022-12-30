import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponse } from './auth.interface';
import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(user: RegisterUserDto): Promise<UserResponse> {
    return await this.userRepository.save(user);
  }
}
