import { ParticipanteRepository } from '../repositories/participante.repository';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
import { Participante } from '../entities/participante.entity';
export declare class ParticipanteService {
    private readonly participanteRepository;
    constructor(participanteRepository: ParticipanteRepository);
    create(createParticipanteDto: CreateParticipanteDto): Promise<Participante>;
    findAll(competenciaId?: number): Promise<Participante[]>;
    findOne(id: number): Promise<Participante>;
    update(id: number, updateParticipanteDto: UpdateParticipanteDto): Promise<Participante>;
    remove(id: number): Promise<void>;
}
