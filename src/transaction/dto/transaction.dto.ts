import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsNotEmpty } from "class-validator";
import { PAYMENT_METHOD } from "../entity/transaction.entity";
export type UserOrder = {
    product: number;
    product_quantities:string;
    amount:string;

  };
export class transactionDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsLowercase()
    phoneNumber:string
    

    @ApiProperty()
    @IsNotEmpty()
    @IsLowercase()
    paymentMethod:PAYMENT_METHOD

    @ApiProperty()
    @IsNotEmpty()
    @IsLowercase()
    customer_notes:string

    @IsNotEmpty()
    @ApiProperty()
    item: UserOrder
}