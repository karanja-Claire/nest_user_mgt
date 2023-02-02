import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transactionDto } from "../dto/transaction.dto";
import { TransactionInterface } from "../interfaces/transaction.interface";
import { TransactionEntity } from "../entity/transaction.entity";

@Injectable()
export class TransactionService{
    constructor(@InjectRepository(TransactionEntity) private transactionRepository:Repository<TransactionEntity>){}

    async prepareTransactionRecord(payload:transactionDto):Promise<TransactionInterface>{
        return await this.transactionRepository.save(payload);

    }
}