import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export class Cv {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({ name: 'firstname' })
    firstName: string
    @Column({
        nullable: false
    })
    age: number
    @Column()
    cin: string
    @Column()
    job: string
    @Column()
    path: string
    @ManyToOne(() => User, (user) => user.cvs)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToMany(() => Skill, (skills) => skills.cvs)
    @JoinTable({
        name: 'cv_skill',
        joinColumn: { name: 'cv_id' },
        inverseJoinColumn: { name: 'skill_id' },
    })
    skills: Skill[]
}
