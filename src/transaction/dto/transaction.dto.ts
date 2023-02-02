import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsNotEmpty } from "class-validator";

export class transactionDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsLowercase()
    phoneNumber:string

    @ApiProperty()
    @IsNotEmpty()
    @IsLowercase()
    Amount:string
}