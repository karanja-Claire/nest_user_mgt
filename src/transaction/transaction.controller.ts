import { Body, Controller, Post } from '@nestjs/common';
import { transactionDto } from './dto/transaction.dto';
import { TransactionInterface } from './interfaces/transaction.interface';
import { TransactionService } from './services/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post('initiate')
  async initiate(
    @Body()
    body: transactionDto,
  ): Promise<TransactionInterface> {
    return await this.transactionService.prepareTransactionRecord(body);
  }
}
