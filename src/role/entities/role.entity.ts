
import { Authority } from "src/authority/entities/authority.entity"
import { User } from "src/user/entities/user.entity"
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity('role')
export class Role {
    @Column()
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    key: string
    @Column()
    name: String
    @Column()
    description: string
    @ManyToMany(() => Authority, (autorities) => autorities.roles,)
    autorities: Authority[]
    @OneToMany(() => User, (user) => user.role)
    users: User[]
}
