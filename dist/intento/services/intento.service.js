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
let IntentoService = class IntentoService {
    intentoRepository;
    constructor(intentoRepository) {
        this.intentoRepository = intentoRepository;
    }
    async create(createIntentoDto) {
        const existingIntento = await this.intentoRepository.findByParticipanteAndTipoAndNumero(createIntentoDto.participanteId, createIntentoDto.tipo, createIntentoDto.numero);
        if (existingIntento) {
            throw new common_1.BadRequestException('El intento ya existe para este participante, tipo y número.');
        }
        return this.intentoRepository.create(createIntentoDto);
    }
    async update(id, updateIntentoDto) {
        const intento = await this.intentoRepository.findOne(id);
        if (!intento) {
            throw new common_1.NotFoundException('Intento no encontrado');
        }
        const updatedIntento = await this.intentoRepository.update(id, updateIntentoDto);
        if (!updatedIntento) {
            throw new common_1.NotFoundException('Intento no encontrado');
        }
        return updatedIntento;
    }
    async findByParticipante(participanteId) {
        return this.intentoRepository.findByParticipante(participanteId);
    }
};
exports.IntentoService = IntentoService;
exports.IntentoService = IntentoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [intento_repository_1.IntentoRepository])
], IntentoService);
//# sourceMappingURL=intento.service.js.map