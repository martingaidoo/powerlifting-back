import { Repository } from 'typeorm';
import { Levantamiento } from '../entities/levantamiento.entity';
import { CreateLevantamientoDto } from '../dto/create-levantamiento.dto';
export declare class LevantamientoService {
    private levantamientoRepository;
    constructor(levantamientoRepository: Repository<Levantamiento>);
    create(createLevantamientoDto: CreateLevantamientoDto): Promise<Levantamiento>;
    private validateWeights;
    findAll(competenciaId?: number): Promise<Levantamiento[]>;
    findByParticipante(participanteId: number): Promise<Levantamiento[]>;
    findOne(id: string): Promise<Levantamiento>;
}
