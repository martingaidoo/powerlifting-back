import { Intento, TipoMovimiento } from '../entities/intento.entity';
export declare abstract class IntentoRepository {
    abstract create(intento: Partial<Intento>): Promise<Intento>;
    abstract update(id: number, intento: Partial<Intento>): Promise<Intento | null>;
    abstract findByParticipante(participanteId: number): Promise<Intento[]>;
    abstract findOne(id: number): Promise<Intento | null>;
    abstract findByParticipanteAndTipoAndNumero(participanteId: number, tipo: TipoMovimiento, numero: number): Promise<Intento | null>;
}
