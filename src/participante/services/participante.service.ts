import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipanteRepository } from '../repositories/participante.repository';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';
import { Participante } from '../entities/participante.entity';

@Injectable()
export class ParticipanteService {
    constructor(private readonly participanteRepository: ParticipanteRepository) { }

    create(createParticipanteDto: CreateParticipanteDto): Promise<Participante> {
        return this.participanteRepository.create(createParticipanteDto);
    }

    findAll(competenciaId?: number): Promise<Participante[]> {
        return this.participanteRepository.findAll(competenciaId);
    }

    async findOne(id: number): Promise<Participante> {
        const participante = await this.participanteRepository.findOne(id);
        if (!participante) {
            throw new NotFoundException(`Participante #${id} not found`);
        }
        return participante;
    }

    update(id: number, updateParticipanteDto: UpdateParticipanteDto): Promise<Participante> {
        return this.participanteRepository.update(id, updateParticipanteDto);
    }

    remove(id: number): Promise<void> {
        return this.participanteRepository.remove(id);
    }
}
