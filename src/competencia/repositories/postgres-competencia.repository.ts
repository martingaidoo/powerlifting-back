import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competencia } from '../entities/competencia.entity';
import { CompetenciaRepository } from './competencia.repository';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';

@Injectable()
export class PostgresCompetenciaRepository implements CompetenciaRepository {
    constructor(
        @InjectRepository(Competencia)
        private readonly typeOrmRepository: Repository<Competencia>,
    ) { }

    async create(data: CreateCompetenciaDto): Promise<Competencia> {
        const competencia = this.typeOrmRepository.create(data);
        return this.typeOrmRepository.save(competencia);
    }

    async findAll(): Promise<Competencia[]> {
        return this.typeOrmRepository.find();
    }

    async findOne(id: number): Promise<Competencia | null> {
        const competencia = await this.typeOrmRepository.findOne({ where: { id } });
        return competencia;
    }

    async update(id: number, data: UpdateCompetenciaDto): Promise<Competencia> {
        const competencia = await this.findOne(id);
        if (!competencia) {
            throw new NotFoundException(`Competencia #${id} not found`);
        }
        Object.assign(competencia, data);
        return this.typeOrmRepository.save(competencia);
    }

    async remove(id: number): Promise<void> {
        const result = await this.typeOrmRepository.softDelete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Competencia #${id} not found`);
        }
    }
}
