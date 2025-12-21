import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Participante } from '../../participante/entities/participante.entity';

@Entity()
export class Competencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ type: 'date' })
    fecha: string;

    @Column({ type: 'time' })
    hora: string;

    @Column('int')
    fase: number;

    @OneToMany(() => Participante, (participante) => participante.competencia)
    participantes: Participante[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
