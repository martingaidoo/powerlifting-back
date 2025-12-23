import { IntentoRepository } from '../repositories/intento.repository';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';
import { Intento } from '../entities/intento.entity';
import { ParticipanteRepository } from '../../participante/repositories/participante.repository';
export declare class IntentoService {
    private readonly intentoRepository;
    private readonly participanteRepository;
    constructor(intentoRepository: IntentoRepository, participanteRepository: ParticipanteRepository);
    create(createIntentoDto: CreateIntentoDto): Promise<Intento>;
    update(id: number, updateIntentoDto: UpdateIntentoDto): Promise<Intento>;
    findByParticipante(participanteId: number): Promise<Intento[]>;
    private validateWeightIncrement;
    private validateParticipanteDiscipline;
    private validateProgression;
}
