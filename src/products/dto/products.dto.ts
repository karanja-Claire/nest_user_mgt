import { IsBoolean, IsLowercase, IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsLowercase()
    name: string;
  
    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    quantity: string;
  
    @IsBoolean()
    available?: boolean;
  }
  