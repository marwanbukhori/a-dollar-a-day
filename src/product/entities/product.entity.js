import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id;
    @Column({ type: 'varchar', length: 255 })
    name;
    @Column({ type: 'varchar', length: 255 })
    imageUrl;
    @Column({ type: 'varchar', length: 100 })
    category;
    @Column('simple-array')
    skinProblem;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price;
    @Column({ type: 'decimal', precision: 3, scale: 1 })
    rating;
    @Column({ type: 'integer' })
    sold;
    @Column({ type: 'varchar', length: 255 })
    affiliateLink;
    @CreateDateColumn()
    createdAt;
    @UpdateDateColumn()
    updatedAt;
}
//# sourceMappingURL=product.entity.js.map