import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './authentication.helper';
import { UserLoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from './entity/user.entity';



@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {}





  public async register(body: RegisterUserDto): Promise<UserEntity | never> {
    // const { username,first_name,last_name,address,phone_no, email, password }: RegisterUserDto = body;
    let user: UserEntity = await this.userRepository.findOne({ where: { email:body.email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new UserEntity();

    user.username = body.username;
    user.email = body.email;
    user.first_name =body.first_name;
    user.last_name= body.last_name;
    user.phone_no=body.phone_no;
    user.password = this.helper.encodePassword(body.password);

    return this.userRepository.save(user);
  }

  public async login(body: UserLoginDto): Promise<string | never> {
    // const { email, password }: UserLoginDto = body;
    const user: UserEntity = await this.userRepository.findOne({ where: { email:body.email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(body.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  public async refresh(user: UserEntity): Promise<string> {

    return this.helper.generateToken(user);
  }
}


