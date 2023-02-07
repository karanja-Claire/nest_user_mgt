import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/products.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductsInterface } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async newProduct(payload: ProductDto): Promise<ProductsInterface> {
    return await this.productRepository.save(payload);
  }
  async getProducts() {
    return await this.productRepository.find();
  }
  async updateProducts(id: string, @Body() payload: ProductDto) {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new HttpException('product not found', HttpStatus.BAD_REQUEST);
    }
    if (product) {
      return await this.productRepository.update(
        { id: id },
        {
          name: payload.name,
          price: payload.price,
          description: payload.description,
          quantity: payload.quantity,
          available: payload.available,
        },
      );
    }
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.delete(id);
    return product;
  }
}
