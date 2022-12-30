import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../auth.interface';
import { AuthenticationService } from '../authentication.service';
import { RegisterUserDto } from '../dto/register.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthenticationService) {}

  @ApiTags('Authentication')
  @Post('/auth/register')
  register(
    @Body()
    registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    return this.authService.signup(registerUserDto);
  }
}
