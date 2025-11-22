import { Cv } from "src/cv/entities/cv.entity";
import { AfterLoad, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string
    @Column()
    salt: string

    @OneToMany(() => Cv, (cv) => cv.user, { eager: true })
    cvs: Cv[]

    @AfterLoad()
    logUser() {
        //console.log('The loaded user his ', this)

    }

}
