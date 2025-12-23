import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Participante } from '../../participante/entities/participante.entity';

export enum TipoMovimiento {
    SENTADILLA = 'SENTADILLA',
    BANCA = 'BANCA',
    MUERTO = 'MUERTO',
}

export enum ResultadoIntento {
    PENDIENTE = 'PENDIENTE',
    EXITO = 'EXITO',
    FALLO = 'FALLO',
}

@Entity()
export class Intento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    participanteId: number;

    @ManyToOne(() => Participante, (participante) => participante.intentos)
    @JoinColumn({ name: 'participanteId' })
    participante: Participante;

    @Column({
        type: 'enum',
        enum: TipoMovimiento,
    })
    tipo: TipoMovimiento;

    @Column('int')
    numero: number; // 1, 2, or 3

    @Column('float')
    peso: number;

    @Column({
        type: 'enum',
        enum: ResultadoIntento,
        default: ResultadoIntento.PENDIENTE,
    })
    resultado: ResultadoIntento;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
