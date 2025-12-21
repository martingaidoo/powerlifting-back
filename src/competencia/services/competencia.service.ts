import { Injectable, NotFoundException } from '@nestjs/common';
import { CompetenciaRepository } from '../repositories/competencia.repository';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';
import { Competencia } from '../entities/competencia.entity';

@Injectable()
export class CompetenciaService {
    constructor(private readonly competenciaRepository: CompetenciaRepository) { }

    create(createCompetenciaDto: CreateCompetenciaDto): Promise<Competencia> {
        return this.competenciaRepository.create(createCompetenciaDto);
    }

    findAll(): Promise<Competencia[]> {
        return this.competenciaRepository.findAll();
    }

    async findOne(id: number): Promise<Competencia> {
        const competencia = await this.competenciaRepository.findOne(id);
        if (!competencia) {
            throw new NotFoundException(`Competencia #${id} not found`);
        }
        return competencia;
    }

    update(id: number, updateCompetenciaDto: UpdateCompetenciaDto): Promise<Competencia> {
        return this.competenciaRepository.update(id, updateCompetenciaDto);
    }

    remove(id: number): Promise<void> {
        return this.competenciaRepository.remove(id);
    }
}
