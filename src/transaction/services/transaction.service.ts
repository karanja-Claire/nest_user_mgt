import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { transactionDto } from '../dto/transaction.dto';
import { TransactionInterface } from '../interfaces/transaction.interface';
import {
  PAYMENT_METHOD,
  STATUS,
  TransactionEntity,
} from '../entity/transaction.entity';
import { orderMngtEntity } from '../entity/ordermngt.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async prepareTransaction(
    payload: transactionDto,
  ): Promise<TransactionInterface> {
    const data = await this.prepareTransactionRecord(payload);
    await this.prepareOrderRecord(payload);

    return data;
  }
  async prepareTransactionRecord(payload): Promise<TransactionEntity> {
    const transaction = new TransactionEntity();
    (transaction.phoneNumber = payload.phoneNumber),
      (transaction.status = STATUS.PENDING),
      (transaction.transactionRef = this.generateTransactionRef().toString());
    transaction.paymentMethod = payload.paymentMethod;
    await this.transactionRepository.save(transaction);
    switch (transaction.paymentMethod) {
      case PAYMENT_METHOD.MPESA:
        // handle mobile money integrations

        break;
      case PAYMENT_METHOD.CARD:
        // Handle card payments
        break;
      default:
        break;
    }
    return transaction;
  }

  async prepareOrderRecord(payload): Promise<orderMngtEntity> {
    const order = new orderMngtEntity();
    (order.order_id = this.generateTransactionRef().toString()),
      (order.product = payload.product),
      (order.product_quantities = payload.product_quantities),
      (order.tracking_number = this.generateTransactionRef().toString()),
      (order.customer_notes = payload.customer_notes),
      (order.order_total = (
        payload.product_quantities * payload.product.price
      ).toString());
    return order;
  }

  generateTransactionRef() {
    const now = new Date().getTime();
    const random = Math.floor(Math.random() * 100000);
    return now + random;
  }
}
