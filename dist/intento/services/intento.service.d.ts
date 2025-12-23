import { IntentoRepository } from '../repositories/intento.repository';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';
import { Intento } from '../entities/intento.entity';
export declare class IntentoService {
    private readonly intentoRepository;
    constructor(intentoRepository: IntentoRepository);
    create(createIntentoDto: CreateIntentoDto): Promise<Intento>;
    update(id: number, updateIntentoDto: UpdateIntentoDto): Promise<Intento>;
    findByParticipante(participanteId: number): Promise<Intento[]>;
}
