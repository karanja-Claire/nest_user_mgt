import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './authentication.helper';
import { UserLoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UserEntity } from './entity/user.entity';
import {
  loginResponse,
  RegisterResponse,
  updateUser,
} from './interface/register.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) {}

  public async register(body: RegisterUserDto): Promise<RegisterResponse> {
    // const { username,first_name,last_name,address,phone_no, email, password }: RegisterUserDto = body;

    let user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.BAD_REQUEST);
    }
    try {
      user = new UserEntity();

      user.username = body.username;
      user.email = body.email;
      user.first_name = body.first_name;
      user.last_name = body.last_name;
      user.phone_no = body.phone_no;
      user.address = body.address;
      user.password = this.helper.encodePassword(body.password);

      this.userRepository.save(user);
      return user;
    } catch (error: any) {
      const data = error.Response;
      throw new HttpException(data, HttpStatus.BAD_REQUEST);
    }
  }

  public async login(body: UserLoginDto): Promise<any> {
    // const { email, password }: UserLoginDto = body;
    const user: UserEntity = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      body.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }

  public async refresh(user: UserEntity): Promise<string> {
    return this.helper.generateToken(user);
  }

  async updateUser(id: string, payload: updateUser) {
    const user = await this.userRepository.findOne({
      where: { id: id.toString() },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    if (user) {
      await this.userRepository.update(
        { id: id },
        {
          username: payload.username,
          phone_no: payload.phone_no,
        },
      );
    }
    return user;
  }
}
