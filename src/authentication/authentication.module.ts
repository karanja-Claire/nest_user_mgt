import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHelper } from './authentication.helper';
import { JwtStrategy } from './authentication.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthenticationService, AuthHelper, JwtStrategy],
  imports: [ PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get('JWT_KEY'),
      signOptions: { expiresIn: config.get('JWT_EXPIRES') },
    }),
  }),TypeOrmModule.forFeature([UserEntity])],
})
export class AuthenticationModule {}
