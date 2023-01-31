import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductDto } from "./dto/products.dto";
import { ProductEntity } from "./entity/product.entity";
import { ProductsInterface } from "./interface/product.interface";
import { ProductsService } from "./products.service";
@ApiTags('Products')
@Controller('Products')
export class ProductsController {
    constructor(private productsService:ProductsService){}

    @Post('/')
    async postProduct(@Body()payload:ProductDto):Promise<ProductsInterface>{
        return await this.productsService.newProduct(payload)
    }

    @Get('/')
    async getAllProducts()
    {
        return await this.productsService.getProducts()
    }
    @Patch('/')
    async updateProduct(@Param('id')id:string, @Body() payload:ProductDto){
        return await this.productsService.updateProducts(id,payload)
    }
    @Delete('/')
    async delete(@Param('id')id:string){
        return await this.productsService.deleteProduct(id)
    }
}