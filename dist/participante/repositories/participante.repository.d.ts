import { Participante } from '../entities/participante.entity';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
export declare abstract class ParticipanteRepository {
    abstract create(data: CreateParticipanteDto): Promise<Participante>;
    abstract findAll(competenciaId?: number): Promise<Participante[]>;
    abstract findOne(id: number): Promise<Participante | null>;
    abstract update(id: number, data: UpdateParticipanteDto): Promise<Participante>;
    abstract remove(id: number): Promise<void>;
}
