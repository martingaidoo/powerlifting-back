import { Repository } from 'typeorm';
import { Participante } from '../entities/participante.entity';
import { ParticipanteRepository } from './participante.repository';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
export declare class PostgresParticipanteRepository implements ParticipanteRepository {
    private readonly typeOrmRepository;
    constructor(typeOrmRepository: Repository<Participante>);
    create(data: CreateParticipanteDto): Promise<Participante>;
    findAll(competenciaId?: number): Promise<Participante[]>;
    findOne(id: number): Promise<Participante | null>;
    update(id: number, data: UpdateParticipanteDto): Promise<Participante>;
    remove(id: number): Promise<void>;
}
