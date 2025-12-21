import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participante } from '../entities/participante.entity';
import { ParticipanteRepository } from './participante.repository';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
import { Competencia } from '../../competencia/entities/competencia.entity';

@Injectable()
export class PostgresParticipanteRepository implements ParticipanteRepository {
    constructor(
        @InjectRepository(Participante)
        private readonly typeOrmRepository: Repository<Participante>,
    ) { }

    async create(data: CreateParticipanteDto): Promise<Participante> {
        const participante = this.typeOrmRepository.create({
            ...data,
            competencia: { id: data.competenciaId } as Competencia
        });
        return this.typeOrmRepository.save(participante);
    }

    async findAll(competenciaId?: number): Promise<Participante[]> {
        if (competenciaId) {
            return this.typeOrmRepository.find({ where: { competencia: { id: competenciaId } } });
        }
        return this.typeOrmRepository.find();
    }

    async findOne(id: number): Promise<Participante | null> {
        return this.typeOrmRepository.findOne({ where: { id }, relations: ['competencia'] });
    }

    async update(id: number, data: UpdateParticipanteDto): Promise<Participante> {
        const participante = await this.findOne(id);
        if (!participante) {
            throw new NotFoundException(`Participante #${id} not found`);
        }
        const { competenciaId, ...rest } = data;
        Object.assign(participante, rest);

        if (competenciaId) {
            participante.competencia = { id: competenciaId } as Competencia;
        }

        return this.typeOrmRepository.save(participante);
    }

    async remove(id: number): Promise<void> {
        const result = await this.typeOrmRepository.softDelete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Participante #${id} not found`);
        }
    }
}
