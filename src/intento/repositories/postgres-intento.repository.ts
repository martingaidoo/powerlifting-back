import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intento, TipoMovimiento } from '../entities/intento.entity';
import { IntentoRepository } from './intento.repository';

@Injectable()
export class PostgresIntentoRepository extends IntentoRepository {
    constructor(
        @InjectRepository(Intento)
        private readonly typeOrmRepository: Repository<Intento>,
    ) {
        super();
    }

    async create(intento: Partial<Intento>): Promise<Intento> {
        const newIntento = this.typeOrmRepository.create(intento);
        return this.typeOrmRepository.save(newIntento);
    }

    async update(id: number, intento: Partial<Intento>): Promise<Intento | null> {
        await this.typeOrmRepository.update(id, intento);
        return this.typeOrmRepository.findOne({ where: { id } });
    }

    async findByParticipante(participanteId: number): Promise<Intento[]> {
        return this.typeOrmRepository.find({ where: { participanteId } });
    }

    async findOne(id: number): Promise<Intento | null> {
        return this.typeOrmRepository.findOne({ where: { id } });
    }

    async findByParticipanteAndTipoAndNumero(participanteId: number, tipo: TipoMovimiento, numero: number): Promise<Intento | null> {
        return this.typeOrmRepository.findOne({ where: { participanteId, tipo, numero } });
    }
}
