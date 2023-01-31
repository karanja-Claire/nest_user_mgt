import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'product',
  })
  export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
    quantity:string;

    @Column()
    price:string;

    @Column()
    description:string;
    
    @Column({nullable:true})
    image:string;

    @Column({default:false})
    available:boolean
    
    @CreateDateColumn()
    created_at: string;
  
    @UpdateDateColumn()
    updated_at: string;
  }