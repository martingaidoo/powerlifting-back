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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevantamientoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const levantamiento_entity_1 = require("../entities/levantamiento.entity");
let LevantamientoService = class LevantamientoService {
    levantamientoRepository;
    constructor(levantamientoRepository) {
        this.levantamientoRepository = levantamientoRepository;
    }
    async create(createLevantamientoDto) {
        this.validateWeights(createLevantamientoDto);
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
    validateWeights(dto) {
        if (dto.peso1 <= 0 || dto.peso2 <= 0 || dto.peso3 <= 0) {
            throw new common_1.BadRequestException('Weights must be positive numbers');
        }
        if (dto.peso1 % 2.5 !== 0 || dto.peso2 % 2.5 !== 0 || dto.peso3 % 2.5 !== 0) {
            throw new common_1.BadRequestException('Weights must be multiples of 2.5');
        }
    }
    async findAll(competenciaId) {
        const query = this.levantamientoRepository.createQueryBuilder('levantamiento');
        if (competenciaId) {
            query.innerJoin('levantamiento.participante', 'participante');
            query.where('participante.competenciaId = :competenciaId', { competenciaId });
        }
        return query.getMany();
    }
    async findByParticipante(participanteId) {
        return this.levantamientoRepository.find({
            where: { participanteId },
            order: { tipo: 'ASC' },
        });
    }
    async findOne(id) {
        const levantamiento = await this.levantamientoRepository.findOne({ where: { id } });
        if (!levantamiento) {
            throw new common_1.NotFoundException(`Levantamiento #${id} not found`);
        }
        return levantamiento;
    }
};
exports.LevantamientoService = LevantamientoService;
exports.LevantamientoService = LevantamientoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(levantamiento_entity_1.Levantamiento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LevantamientoService);
//# sourceMappingURL=levantamiento.service.js.map