
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
// import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserEntity } from './entity/user.entity';
import { UserLoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthenticationService)
  private readonly service: AuthenticationService;

  @Post('register')
  // @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() body: RegisterUserDto): Promise<UserEntity | never> {
    return await this.service.register(body);
  }

  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<string | never> {
    return await this.service.login(body);
  }

  @Post('refresh')
  // @UseGuards(JwtAuthGuard)
  async refresh(@Req() { user }: Request): Promise<string | never> {
    return await this.service.refresh(<UserEntity>user);
  }
}
