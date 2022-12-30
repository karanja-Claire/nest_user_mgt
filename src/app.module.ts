import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserEntity } from './authentication/entity/user.entity';
import config from './database/config';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    config,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
