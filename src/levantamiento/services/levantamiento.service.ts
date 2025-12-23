import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Levantamiento } from '../entities/levantamiento.entity';
import { CreateLevantamientoDto } from '../dto/create-levantamiento.dto';

@Injectable()
export class LevantamientoService {
    constructor(
        @InjectRepository(Levantamiento)
        private levantamientoRepository: Repository<Levantamiento>,
    ) { }

    async create(createLevantamientoDto: CreateLevantamientoDto): Promise<Levantamiento> {
        this.validateWeights(createLevantamientoDto);

        // Check if a plan already exists for this participant and discipline
        const existing = await this.levantamientoRepository.findOne({
            where: {
                participanteId: createLevantamientoDto.participanteId,
                tipo: createLevantamientoDto.tipo,
            }
        });

        if (existing) {
            existing.peso1 = createLevantamientoDto.peso1;
            existing.peso2 = createLevantamientoDto.peso2;
            existing.peso3 = createLevantamientoDto.peso3;
            return this.levantamientoRepository.save(existing);
        }

        const levantamiento = this.levantamientoRepository.create(createLevantamientoDto);
        return this.levantamientoRepository.save(levantamiento);
    }

    private validateWeights(dto: CreateLevantamientoDto) {
        if (dto.peso1 <= 0 || dto.peso2 <= 0 || dto.peso3 <= 0) {
            throw new BadRequestException('Weights must be positive numbers');
        }
        if (dto.peso1 % 2.5 !== 0 || dto.peso2 % 2.5 !== 0 || dto.peso3 % 2.5 !== 0) {
            throw new BadRequestException('Weights must be multiples of 2.5');
        }
    }

    async findAll(competenciaId?: number): Promise<Levantamiento[]> {
        const query = this.levantamientoRepository.createQueryBuilder('levantamiento');

        if (competenciaId) {
            query.innerJoin('levantamiento.participante', 'participante');
            query.where('participante.competenciaId = :competenciaId', { competenciaId });
        }

        return query.getMany();
    }

    async findByParticipante(participanteId: number): Promise<Levantamiento[]> {
        return this.levantamientoRepository.find({
            where: { participanteId },
            order: { tipo: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Levantamiento> {
        const levantamiento = await this.levantamientoRepository.findOne({ where: { id } });
        if (!levantamiento) {
            throw new NotFoundException(`Levantamiento #${id} not found`);
        }
        return levantamiento;
    }
}
