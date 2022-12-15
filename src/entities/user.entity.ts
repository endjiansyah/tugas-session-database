import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
        length: 30,
    })
    username: string;

    @Column({
        nullable: false,
        default: '',
        unique: true
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;
    // @Column({
    //     nullable: false,
    //     default: '',
    // })
    // pet: string;
}
