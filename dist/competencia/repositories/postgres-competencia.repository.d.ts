import { Repository } from 'typeorm';
import { Competencia } from '../entities/competencia.entity';
import { CompetenciaRepository } from './competencia.repository';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';
export declare class PostgresCompetenciaRepository implements CompetenciaRepository {
    private readonly typeOrmRepository;
    constructor(typeOrmRepository: Repository<Competencia>);
    create(data: CreateCompetenciaDto): Promise<Competencia>;
    findAll(): Promise<Competencia[]>;
    findOne(id: number): Promise<Competencia | null>;
    update(id: number, data: UpdateCompetenciaDto): Promise<Competencia>;
    remove(id: number): Promise<void>;
}
