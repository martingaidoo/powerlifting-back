import { LevantamientoService } from '../services/levantamiento.service';
import { CreateLevantamientoDto } from '../dto/create-levantamiento.dto';
export declare class LevantamientoController {
    private readonly levantamientoService;
    constructor(levantamientoService: LevantamientoService);
    create(createLevantamientoDto: CreateLevantamientoDto): Promise<import("../entities/levantamiento.entity").Levantamiento>;
    findByParticipante(id: number): Promise<import("../entities/levantamiento.entity").Levantamiento[]>;
}
