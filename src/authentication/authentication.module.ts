import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthController],
  providers: [AuthenticationService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthenticationModule {}
