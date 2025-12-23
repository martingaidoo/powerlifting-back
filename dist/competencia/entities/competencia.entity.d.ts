import { Participante } from '../../participante/entities/participante.entity';
export declare class Competencia {
    id: number;
    nombre: string;
    fecha: string;
    hora: string;
    fase: number;
    participantes: Participante[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
