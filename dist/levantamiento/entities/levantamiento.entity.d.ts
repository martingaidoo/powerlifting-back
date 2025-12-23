import { Participante } from '../../participante/entities/participante.entity';
import { TipoMovimiento } from '../../intento/entities/intento.entity';
export declare class Levantamiento {
    id: string;
    participanteId: number;
    participante: Participante;
    tipo: TipoMovimiento;
    peso1: number;
    peso2: number;
    peso3: number;
    createdAt: Date;
    updatedAt: Date;
}
