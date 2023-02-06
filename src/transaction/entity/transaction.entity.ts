import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { orderMngtEntity } from "./ordermngt.entity";
export enum STATUS {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
    INITIATED = 'INITIATED',
  }
export enum PAYMENT_METHOD{
    MPESA ="MPESA",
    CARD ="CARD"
  }
@Entity({
    name: 'Transaction',
  })
  export class TransactionEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'enum',  enum: PAYMENT_METHOD,})
    paymentMethod:PAYMENT_METHOD

    @Column({unique:true})
    transactionRef:string

    @Column()
    phoneNumber:string

    @Column()
    amount:string

    @OneToOne(() => orderMngtEntity, (order) => order.id)
    @JoinColumn()
    order: orderMngtEntity;

    @Column({type:'enum',enum:STATUS, default:STATUS.PENDING})
    status:STATUS

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
  }