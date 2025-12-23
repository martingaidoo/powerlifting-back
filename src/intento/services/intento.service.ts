import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IntentoRepository } from '../repositories/intento.repository';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';
import { Intento, ResultadoIntento, TipoMovimiento } from '../entities/intento.entity';
import { ParticipanteRepository } from '../../participante/repositories/participante.repository';

@Injectable()
export class IntentoService {
    constructor(
        private readonly intentoRepository: IntentoRepository,
        private readonly participanteRepository: ParticipanteRepository
    ) { }

    async create(createIntentoDto: CreateIntentoDto): Promise<Intento> {
        this.validateWeightIncrement(createIntentoDto.peso);

        await this.validateParticipanteDiscipline(createIntentoDto.participanteId, createIntentoDto.tipo);

        const existingIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(
            createIntentoDto.participanteId,
            createIntentoDto.tipo,
            createIntentoDto.numero,
        );

        if (existingIntento) {
            throw new BadRequestException('El intento ya existe para este participante, tipo y número.');
        }

        await this.validateProgression(
            createIntentoDto.participanteId,
            createIntentoDto.tipo,
            createIntentoDto.numero,
            createIntentoDto.peso
        );

        return this.intentoRepository.create(createIntentoDto);
    }

    async update(id: number, updateIntentoDto: UpdateIntentoDto): Promise<Intento> {
        const intento = await this.intentoRepository.findOne(id);
        if (!intento) {
            throw new NotFoundException('Intento no encontrado');
        }

        if (updateIntentoDto.peso) {
            this.validateWeightIncrement(updateIntentoDto.peso);
            // Re-validate progression if weight changes
            await this.validateProgression(
                intento.participanteId,
                intento.tipo,
                intento.numero,
                updateIntentoDto.peso
            );
        }

        const updatedIntento = await this.intentoRepository.update(id, updateIntentoDto);
        if (!updatedIntento) {
            throw new NotFoundException('Intento no encontrado');
        }
        return updatedIntento;
    }

    async findAll(competenciaId?: number): Promise<Intento[]> {
        return this.intentoRepository.findAll(competenciaId);
    }

    async findByParticipante(participanteId: number): Promise<Intento[]> {
        return this.intentoRepository.findByParticipante(participanteId);
    }

    private validateWeightIncrement(peso: number) {
        if (peso % 2.5 !== 0) {
            throw new BadRequestException('El peso debe ser múltiplo de 2.5kg');
        }
    }

    private async validateParticipanteDiscipline(participanteId: number, tipo: TipoMovimiento) {
        const participante = await this.participanteRepository.findOne(participanteId);
        if (!participante) {
            throw new NotFoundException('Participante no encontrado');
        }

        if (tipo === TipoMovimiento.SENTADILLA && !participante.participaSentadilla) {
            throw new BadRequestException('El participante no compite en Sentadilla');
        }
        if (tipo === TipoMovimiento.BANCA && !participante.participaBanca) {
            throw new BadRequestException('El participante no compite en Press de Banca');
        }
        if (tipo === TipoMovimiento.MUERTO && !participante.participaMuerto) {
            throw new BadRequestException('El participante no compite en Peso Muerto');
        }
    }

    private async validateProgression(participanteId: number, tipo: TipoMovimiento, numero: number, peso: number) {
        if (numero === 1) return;

        const previousIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(
            participanteId,
            tipo,
            numero - 1,
        );

        if (!previousIntento) {
            throw new BadRequestException(`No se puede crear el intento ${numero} sin el intento ${numero - 1}`);
        }

        if (previousIntento.resultado === ResultadoIntento.EXITO) {
            if (peso < previousIntento.peso + 2.5) {
                throw new BadRequestException('El peso debe aumentar al menos 2.5kg después de un intento exitoso');
            }
        } else {
            // FALLO or PENDING
            if (peso < previousIntento.peso) {
                throw new BadRequestException('El peso no puede disminuir respecto al intento anterior');
            }
        }
    }
}
