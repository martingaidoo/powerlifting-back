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
exports.PostgresParticipanteRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participante_entity_1 = require("../entities/participante.entity");
let PostgresParticipanteRepository = class PostgresParticipanteRepository {
    typeOrmRepository;
    constructor(typeOrmRepository) {
        this.typeOrmRepository = typeOrmRepository;
    }
    async create(data) {
        const participante = this.typeOrmRepository.create({
            ...data,
            competencia: { id: data.competenciaId }
        });
        return this.typeOrmRepository.save(participante);
    }
    async findAll(competenciaId) {
        if (competenciaId) {
            return this.typeOrmRepository.find({ where: { competencia: { id: competenciaId } } });
        }
        return this.typeOrmRepository.find();
    }
    async findOne(id) {
        return this.typeOrmRepository.findOne({ where: { id }, relations: ['competencia'] });
    }
    async update(id, data) {
        const participante = await this.findOne(id);
        if (!participante) {
            throw new common_1.NotFoundException(`Participante #${id} not found`);
        }
        const { competenciaId, ...rest } = data;
        Object.assign(participante, rest);
        if (competenciaId) {
            participante.competencia = { id: competenciaId };
        }
        return this.typeOrmRepository.save(participante);
    }
    async remove(id) {
        const result = await this.typeOrmRepository.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Participante #${id} not found`);
        }
    }
};
exports.PostgresParticipanteRepository = PostgresParticipanteRepository;
exports.PostgresParticipanteRepository = PostgresParticipanteRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participante_entity_1.Participante)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostgresParticipanteRepository);
//# sourceMappingURL=postgres-participante.repository.js.map