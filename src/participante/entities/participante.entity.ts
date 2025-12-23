import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Competencia } from '../../competencia/entities/competencia.entity';
import { Intento } from '../../intento/entities/intento.entity';

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

    @OneToMany(() => Intento, (intento) => intento.participante)
    intentos: Intento[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
