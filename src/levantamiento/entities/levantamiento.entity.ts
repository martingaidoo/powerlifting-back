import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Participante } from '../../participante/entities/participante.entity';
import { TipoMovimiento } from '../../intento/entities/intento.entity';

@Entity()
export class Levantamiento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    participanteId: number;

    @ManyToOne(() => Participante, (participante) => participante.levantamientos)
    @JoinColumn({ name: 'participanteId' })
    participante: Participante;

    @Column({
        type: 'enum',
        enum: TipoMovimiento,
    })
    tipo: TipoMovimiento;

    @Column('float')
    peso1: number;

    @Column('float')
    peso2: number;

    @Column('float')
    peso3: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
