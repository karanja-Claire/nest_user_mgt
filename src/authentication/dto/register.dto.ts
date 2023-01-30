import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MaxDate,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

// import { UniqueValidatorPipe } from 'src/pipes/unique-validator.pipe';
import { UserEntity } from '../entity/user.entity';

/**
 * register user data transform object
 */
export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @ApiProperty()

  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6, {
    message: 'minLength-{"ln":6,"count":6}',
  })
  @MaxLength(20, {
    message: 'maxLength-{"ln":20,"count":20}',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
    {
      message:
        'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone_no: string;

}
