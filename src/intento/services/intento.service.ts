import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IntentoRepository } from '../repositories/intento.repository';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';
import { Intento } from '../entities/intento.entity';

@Injectable()
export class IntentoService {
    constructor(private readonly intentoRepository: IntentoRepository) { }

    async create(createIntentoDto: CreateIntentoDto): Promise<Intento> {
        const existingIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(
            createIntentoDto.participanteId,
            createIntentoDto.tipo,
            createIntentoDto.numero,
        );

        if (existingIntento) {
            throw new BadRequestException('El intento ya existe para este participante, tipo y número.');
        }

        return this.intentoRepository.create(createIntentoDto);
    }

    async update(id: number, updateIntentoDto: UpdateIntentoDto): Promise<Intento> {
        const intento = await this.intentoRepository.findOne(id);
        if (!intento) {
            throw new NotFoundException('Intento no encontrado');
        }

        const updatedIntento = await this.intentoRepository.update(id, updateIntentoDto);
        if (!updatedIntento) {
            throw new NotFoundException('Intento no encontrado');
        }
        return updatedIntento;
    }

    async findByParticipante(participanteId: number): Promise<Intento[]> {
        return this.intentoRepository.findByParticipante(participanteId);
    }
}
