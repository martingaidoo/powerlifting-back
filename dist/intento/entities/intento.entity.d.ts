import { Participante } from '../../participante/entities/participante.entity';
export declare enum TipoMovimiento {
    SENTADILLA = "SENTADILLA",
    BANCA = "BANCA",
    MUERTO = "MUERTO"
}
export declare enum ResultadoIntento {
    PENDIENTE = "PENDIENTE",
    EXITO = "EXITO",
    FALLO = "FALLO"
}
export declare class Intento {
    id: number;
    participanteId: number;
    participante: Participante;
    tipo: TipoMovimiento;
    numero: number;
    peso: number;
    resultado: ResultadoIntento;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
