import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { TodoStatus } from "../enum/todo-status";
import { Version } from "@nestjs/common";

@Entity('todo')
export class TodoEntity {

    @Column()
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        name: 'user_id'
    })
    userId: number
    @Column({ unique: true, length: 40 })
    title: string
    @Column()
    description: string
    @Column()
    completed: boolean

    @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.PENDING })
    status: TodoStatus
    @CreateDateColumn(
        {
            name: 'created_at', type: 'timestamp',
            update: false,
        }
    )
    createdAt: Date
    @UpdateDateColumn({
        name: 'udpated_at'
    })
    udpatedAt: Date
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date
    @VersionColumn()
    version: number
    @Column({ name: 'users', nullable: false, default: 0 })
    users: number

}