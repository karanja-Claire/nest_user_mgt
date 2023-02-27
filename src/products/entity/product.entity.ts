import { orderMngtEntity } from 'src/transaction/entity/ordermngt.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum PRODUCT_CATEGORY {
  FOOD = 'food',
  ELECTRONICS = 'electronics',
  FASHION = 'fashion',
  HOME_LIVING = 'home_living',
}
@Entity({
  name: 'product',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column()
  price: string;

  @Column()
  category: PRODUCT_CATEGORY;

  @Column()
  product_reviews: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  available: boolean;

  @ManyToOne(() => orderMngtEntity, (order) => order.id)
  @JoinColumn()
  order: orderMngtEntity;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
