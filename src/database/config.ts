import { Injectable } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { UserEntity } from 'src/authentication/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from 'src/products/entity/product.entity';
import { orderMngtEntity } from 'src/transaction/entity/ordermngt.entity';
import { TransactionEntity } from 'src/transaction/entity/transaction.entity';

/**
 * TypeOrm database connection configuration
 * Main configuration to be imported in app module
 * (main application module configuration)
 */

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: +this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [UserEntity, ProductEntity, orderMngtEntity, TransactionEntity],
      synchronize: this.configService.get<boolean>('DATABASE_SYNC'),
      logging: true,
      subscribers: [],
      migrations: [],
    };
  }
}

export default TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
});
