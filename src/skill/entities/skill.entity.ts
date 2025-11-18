import { Cv } from "src/cv/entities/cv.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('skill')
export class Skill {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    designation: string
    @ManyToMany(() => Cv, (cvs) => cvs.skills)
    cvs: Cv[]
}