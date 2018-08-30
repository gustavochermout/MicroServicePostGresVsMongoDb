import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity('bigdocument')
export class Bigdocument{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    value: string;
}