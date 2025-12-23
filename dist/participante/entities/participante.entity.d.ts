import { Competencia } from '../../competencia/entities/competencia.entity';
import { Intento } from '../../intento/entities/intento.entity';
export declare class Participante {
    id: number;
    nombre: string;
    apellido: string;
    peso: number;
    altura: number;
    edad: number;
    competenciaId: number;
    competencia: Competencia;
    intentos: Intento[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
