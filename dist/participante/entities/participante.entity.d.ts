import { Competencia } from '../../competencia/entities/competencia.entity';
import { Intento } from '../../intento/entities/intento.entity';
import { Levantamiento } from '../../levantamiento/entities/levantamiento.entity';
export declare class Participante {
    id: number;
    nombre: string;
    apellido: string;
    peso: number;
    altura: number;
    edad: number;
    competenciaId: number;
    participaSentadilla: boolean;
    participaBanca: boolean;
    participaMuerto: boolean;
    competencia: Competencia;
    intentos: Intento[];
    levantamientos: Levantamiento[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
