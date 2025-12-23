import { CompetenciaService } from '../services/competencia.service';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';
export declare class CompetenciaController {
    private readonly competenciaService;
    constructor(competenciaService: CompetenciaService);
    create(createCompetenciaDto: CreateCompetenciaDto): Promise<import("../entities/competencia.entity").Competencia>;
    findAll(): Promise<import("../entities/competencia.entity").Competencia[]>;
    findOne(id: number): Promise<import("../entities/competencia.entity").Competencia>;
    update(id: number, updateCompetenciaDto: UpdateCompetenciaDto): Promise<import("../entities/competencia.entity").Competencia>;
    replace(id: number, updateCompetenciaDto: UpdateCompetenciaDto): Promise<import("../entities/competencia.entity").Competencia>;
    remove(id: number): Promise<void>;
}
