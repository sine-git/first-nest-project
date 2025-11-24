import { Exclude } from "class-transformer";
import { Cv } from "src/cv/entities/cv.entity";
import { Role } from "src/role/entities/role.entity";
import { AfterLoad, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Exclude()
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

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({
        name: 'role_id'
    })
    role: Role
}
