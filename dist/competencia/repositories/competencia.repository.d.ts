import { Competencia } from '../entities/competencia.entity';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';
export declare abstract class CompetenciaRepository {
    abstract create(data: CreateCompetenciaDto): Promise<Competencia>;
    abstract findAll(): Promise<Competencia[]>;
    abstract findOne(id: number): Promise<Competencia | null>;
    abstract update(id: number, data: UpdateCompetenciaDto): Promise<Competencia>;
    abstract remove(id: number): Promise<void>;
}
