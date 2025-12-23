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
exports.CompetenciaService = void 0;
const common_1 = require("@nestjs/common");
const competencia_repository_1 = require("../repositories/competencia.repository");
let CompetenciaService = class CompetenciaService {
    competenciaRepository;
    constructor(competenciaRepository) {
        this.competenciaRepository = competenciaRepository;
    }
    create(createCompetenciaDto) {
        return this.competenciaRepository.create(createCompetenciaDto);
    }
    findAll() {
        return this.competenciaRepository.findAll();
    }
    async findOne(id) {
        const competencia = await this.competenciaRepository.findOne(id);
        if (!competencia) {
            throw new common_1.NotFoundException(`Competencia #${id} not found`);
        }
        return competencia;
    }
    update(id, updateCompetenciaDto) {
        return this.competenciaRepository.update(id, updateCompetenciaDto);
    }
    remove(id) {
        return this.competenciaRepository.remove(id);
    }
};
exports.CompetenciaService = CompetenciaService;
exports.CompetenciaService = CompetenciaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [competencia_repository_1.CompetenciaRepository])
], CompetenciaService);
//# sourceMappingURL=competencia.service.js.map