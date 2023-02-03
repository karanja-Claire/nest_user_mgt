import { ProductEntity } from "src/products/entity/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export enum ORDER_STATUS{
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED ="cancelled"
}
@Entity({name:'orderMngt'})
export class orderMngtEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    order_id:string;

    
    @Column()
    customer_id:string;

    @Column()
    shipping_address:string;

    @Column()
    order_total:string;

    @Column()
    order_status:ORDER_STATUS;

    @Column()
    shipping_method:string;

    @Column()
    tracking_number:string;

    @OneToMany(() => ProductEntity, (product) => product.id)
    @JoinColumn()
    product: ProductEntity;


    @Column()
    product_quantities:string;

    @Column()
    customer_notes:string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

}