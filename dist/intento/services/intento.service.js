"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentoService = void 0;
const common_1 = require("@nestjs/common");
const intento_repository_1 = require("../repositories/intento.repository");
const intento_entity_1 = require("../entities/intento.entity");
const participante_repository_1 = require("../../participante/repositories/participante.repository");
let IntentoService = class IntentoService {
    intentoRepository;
    participanteRepository;
    constructor(intentoRepository, participanteRepository) {
        this.intentoRepository = intentoRepository;
        this.participanteRepository = participanteRepository;
    }
    async create(createIntentoDto) {
        this.validateWeightIncrement(createIntentoDto.peso);
        await this.validateParticipanteDiscipline(createIntentoDto.participanteId, createIntentoDto.tipo);
        const existingIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(createIntentoDto.participanteId, createIntentoDto.tipo, createIntentoDto.numero);
        if (existingIntento) {
            throw new common_1.BadRequestException('El intento ya existe para este participante, tipo y número.');
        }
        await this.validateProgression(createIntentoDto.participanteId, createIntentoDto.tipo, createIntentoDto.numero, createIntentoDto.peso);
        return this.intentoRepository.create(createIntentoDto);
    }
    async update(id, updateIntentoDto) {
        const intento = await this.intentoRepository.findOne(id);
        if (!intento) {
            throw new common_1.NotFoundException('Intento no encontrado');
        }
        if (updateIntentoDto.peso) {
            this.validateWeightIncrement(updateIntentoDto.peso);
            await this.validateProgression(intento.participanteId, intento.tipo, intento.numero, updateIntentoDto.peso);
        }
        const updatedIntento = await this.intentoRepository.update(id, updateIntentoDto);
        if (!updatedIntento) {
            throw new common_1.NotFoundException('Intento no encontrado');
        }
        return updatedIntento;
    }
    async findAll(competenciaId) {
        return this.intentoRepository.findAll(competenciaId);
    }
    async findByParticipante(participanteId) {
        return this.intentoRepository.findByParticipante(participanteId);
    }
    validateWeightIncrement(peso) {
        if (peso % 2.5 !== 0) {
            throw new common_1.BadRequestException('El peso debe ser múltiplo de 2.5kg');
        }
    }
    async validateParticipanteDiscipline(participanteId, tipo) {
        const participante = await this.participanteRepository.findOne(participanteId);
        if (!participante) {
            throw new common_1.NotFoundException('Participante no encontrado');
        }
        if (tipo === intento_entity_1.TipoMovimiento.SENTADILLA && !participante.participaSentadilla) {
            throw new common_1.BadRequestException('El participante no compite en Sentadilla');
        }
        if (tipo === intento_entity_1.TipoMovimiento.BANCA && !participante.participaBanca) {
            throw new common_1.BadRequestException('El participante no compite en Press de Banca');
        }
        if (tipo === intento_entity_1.TipoMovimiento.MUERTO && !participante.participaMuerto) {
            throw new common_1.BadRequestException('El participante no compite en Peso Muerto');
        }
    }
    async validateProgression(participanteId, tipo, numero, peso) {
        if (numero === 1)
            return;
        const previousIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(participanteId, tipo, numero - 1);
        if (!previousIntento) {
            throw new common_1.BadRequestException(`No se puede crear el intento ${numero} sin el intento ${numero - 1}`);
        }
        if (previousIntento.resultado === intento_entity_1.ResultadoIntento.EXITO) {
            if (peso < previousIntento.peso + 2.5) {
                throw new common_1.BadRequestException('El peso debe aumentar al menos 2.5kg después de un intento exitoso');
            }
        }
        else {
            if (peso < previousIntento.peso) {
                throw new common_1.BadRequestException('El peso no puede disminuir respecto al intento anterior');
            }
        }
    }
};
exports.IntentoService = IntentoService;
exports.IntentoService = IntentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [intento_repository_1.IntentoRepository,
        participante_repository_1.ParticipanteRepository])
], IntentoService);
//# sourceMappingURL=intento.service.js.map