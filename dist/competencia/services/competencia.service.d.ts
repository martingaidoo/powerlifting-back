import { CompetenciaRepository } from '../repositories/competencia.repository';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';
import { Competencia } from '../entities/competencia.entity';
export declare class CompetenciaService {
    private readonly competenciaRepository;
    constructor(competenciaRepository: CompetenciaRepository);
    create(createCompetenciaDto: CreateCompetenciaDto): Promise<Competencia>;
    findAll(): Promise<Competencia[]>;
    findOne(id: number): Promise<Competencia>;
    update(id: number, updateCompetenciaDto: UpdateCompetenciaDto): Promise<Competencia>;
    remove(id: number): Promise<void>;
}
