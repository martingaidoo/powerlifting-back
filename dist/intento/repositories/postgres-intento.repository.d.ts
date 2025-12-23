import { Repository } from 'typeorm';
import { Intento, TipoMovimiento } from '../entities/intento.entity';
import { IntentoRepository } from './intento.repository';
export declare class PostgresIntentoRepository extends IntentoRepository {
    private readonly typeOrmRepository;
    constructor(typeOrmRepository: Repository<Intento>);
    create(intento: Partial<Intento>): Promise<Intento>;
    update(id: number, intento: Partial<Intento>): Promise<Intento | null>;
    findByParticipante(participanteId: number): Promise<Intento[]>;
    findOne(id: number): Promise<Intento | null>;
    findByParticipanteAndTipoAndNumero(participanteId: number, tipo: TipoMovimiento, numero: number): Promise<Intento | null>;
}
