import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsNotEmpty, IsBoolean } from 'class-validator';

/**
 * user login data transfer object
 */
export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLowercase()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty()
  @IsBoolean()
  remember?: boolean;
}
