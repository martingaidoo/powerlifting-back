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
exports.ParticipanteService = void 0;
const common_1 = require("@nestjs/common");
const participante_repository_1 = require("../repositories/participante.repository");
let ParticipanteService = class ParticipanteService {
    participanteRepository;
    constructor(participanteRepository) {
        this.participanteRepository = participanteRepository;
    }
    create(createParticipanteDto) {
        return this.participanteRepository.create(createParticipanteDto);
    }
    findAll(competenciaId) {
        return this.participanteRepository.findAll(competenciaId);
    }
    async findOne(id) {
        const participante = await this.participanteRepository.findOne(id);
        if (!participante) {
            throw new common_1.NotFoundException(`Participante #${id} not found`);
        }
        return participante;
    }
    update(id, updateParticipanteDto) {
        return this.participanteRepository.update(id, updateParticipanteDto);
    }
    remove(id) {
        return this.participanteRepository.remove(id);
    }
};
exports.ParticipanteService = ParticipanteService;
exports.ParticipanteService = ParticipanteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [participante_repository_1.ParticipanteRepository])
], ParticipanteService);
//# sourceMappingURL=participante.service.js.map