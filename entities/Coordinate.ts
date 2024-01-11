import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Coordinate {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column('decimal', { precision: 6, scale: 3 })
    s_longitude!: number

    @Column('decimal', { precision: 6, scale: 3 })
    s_latitude!: number

    @Column('decimal', { precision: 6, scale: 3 })
    d_longitude!: number

    @Column('decimal', { precision: 6, scale: 3 })
    d_latitude!: number

    @Column()
    description!: string
}