import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
  Patch,
  Param,
} from '@nestjs/common';
// import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserEntity } from './entity/user.entity';
import { UserLoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthenticationService } from './authentication.service';
import { RegisterResponse, updateUser } from './interface/register.interface';
import { Role, Roles } from './roles/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    // @Inject(AuthenticationService)
    private readonly authservice: AuthenticationService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: RegisterUserDto,
  ): Promise<RegisterResponse> {
    const result = await this.authservice.register(body);
    return result;
  }

  @Post('login')
  @Roles(Role.User)
  async login(@Body() body: UserLoginDto): Promise<string | never> {
    return await this.authservice.login(body);
  }

  @Patch('user')
  async edit(
    @Param('id') id: string,
    @Body() payload: updateUser,
  ): Promise<any> {
    return await this.authservice.updateUser(id, payload);
  }

  @Post('refresh')
  async refresh(@Req() { user }: Request): Promise<string | never> {
    return await this.authservice.refresh(<UserEntity>user);
  }
}
