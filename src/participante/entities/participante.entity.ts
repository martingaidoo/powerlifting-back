import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Competencia } from '../../competencia/entities/competencia.entity';

@Entity()
export class Participante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column('float', { nullable: true })
    peso: number;

    @Column('float', { nullable: true })
    altura: number;

    @Column('int', { nullable: true })
    edad: number;

    @Column()
    competenciaId: number;

    @ManyToOne(() => Competencia, (competencia) => competencia.participantes)
    @JoinColumn({ name: 'competenciaId' })
    competencia: Competencia;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
