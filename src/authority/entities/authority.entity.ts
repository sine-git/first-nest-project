import { name } from './../../../node_modules/ci-info/index.d';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../../role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('authority')
export class Authority {
    @Column()
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    key: string
    @Column()
    name: String
    @Column()
    description: string
    @ManyToMany(() => Role, (role) => role.autorities)
    @JoinTable(
        {
            name: 'role_authority',
            joinColumn: {
                name: 'role_id'
            },
            inverseJoinColumn: {
                name: 'authority_id'
            }
        }
    )
    roles: Role[]


}
