import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('big')
export class Big extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 500,
        name: 'value',
    })
    value: string;
}
