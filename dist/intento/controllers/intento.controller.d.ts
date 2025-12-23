import { IntentoService } from '../services/intento.service';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';
export declare class IntentoController {
    private readonly intentoService;
    constructor(intentoService: IntentoService);
    create(createIntentoDto: CreateIntentoDto): Promise<import("../entities/intento.entity").Intento>;
    update(id: number, updateIntentoDto: UpdateIntentoDto): Promise<import("../entities/intento.entity").Intento>;
    findAll(competenciaId?: string): Promise<import("../entities/intento.entity").Intento[]>;
    findByParticipante(participanteId: number): Promise<import("../entities/intento.entity").Intento[]>;
}
