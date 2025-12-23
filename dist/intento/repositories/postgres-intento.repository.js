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
exports.PostgresIntentoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const intento_entity_1 = require("../entities/intento.entity");
const intento_repository_1 = require("./intento.repository");
let PostgresIntentoRepository = class PostgresIntentoRepository extends intento_repository_1.IntentoRepository {
    typeOrmRepository;
    constructor(typeOrmRepository) {
        super();
        this.typeOrmRepository = typeOrmRepository;
    }
    async create(intento) {
        const newIntento = this.typeOrmRepository.create(intento);
        return this.typeOrmRepository.save(newIntento);
    }
    async update(id, intento) {
        await this.typeOrmRepository.update(id, intento);
        return this.typeOrmRepository.findOne({ where: { id } });
    }
    async findByParticipante(participanteId) {
        return this.typeOrmRepository.find({ where: { participanteId } });
    }
    async findOne(id) {
        return this.typeOrmRepository.findOne({ where: { id } });
    }
    async findByParticipanteAndTipoAndNumero(participanteId, tipo, numero) {
        return this.typeOrmRepository.findOne({ where: { participanteId, tipo, numero } });
    }
    async findAll(competenciaId) {
        const query = this.typeOrmRepository.createQueryBuilder('intento');
        if (competenciaId) {
            query.innerJoin('intento.participante', 'participante');
            query.where('participante.competenciaId = :competenciaId', { competenciaId });
        }
        return query.getMany();
    }
};
exports.PostgresIntentoRepository = PostgresIntentoRepository;
exports.PostgresIntentoRepository = PostgresIntentoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(intento_entity_1.Intento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostgresIntentoRepository);
//# sourceMappingURL=postgres-intento.repository.js.map