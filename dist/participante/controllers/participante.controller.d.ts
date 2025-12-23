import { ParticipanteService } from '../services/participante.service';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
export declare class ParticipanteController {
    private readonly participanteService;
    constructor(participanteService: ParticipanteService);
    create(createParticipanteDto: CreateParticipanteDto): Promise<import("../entities/participante.entity").Participante>;
    findAll(competenciaId?: string): Promise<import("../entities/participante.entity").Participante[]>;
    findOne(id: number): Promise<import("../entities/participante.entity").Participante>;
    update(id: number, updateParticipanteDto: UpdateParticipanteDto): Promise<import("../entities/participante.entity").Participante>;
    remove(id: number): Promise<void>;
}
