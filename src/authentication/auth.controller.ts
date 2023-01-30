
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Res } from '@nestjs/common';
// import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserEntity } from './entity/user.entity';
import { UserLoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { AuthenticationService } from './authentication.service';
import { RegisterResponse } from './interface/register.interface';

@Controller('auth')
export class AuthController {
  @Inject(AuthenticationService)
  private readonly service: AuthenticationService;

  @Post('register')
  async register(@Body() 
  body: RegisterUserDto,    @Res() res: Response,
  ): Promise<RegisterResponse> {
    const result = await this.service.register(body);
    return result

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
