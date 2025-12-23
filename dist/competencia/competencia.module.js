"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetenciaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const competencia_service_1 = require("./services/competencia.service");
const competencia_controller_1 = require("./controllers/competencia.controller");
const competencia_entity_1 = require("./entities/competencia.entity");
const competencia_repository_1 = require("./repositories/competencia.repository");
const postgres_competencia_repository_1 = require("./repositories/postgres-competencia.repository");
let CompetenciaModule = class CompetenciaModule {
};
exports.CompetenciaModule = CompetenciaModule;
exports.CompetenciaModule = CompetenciaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([competencia_entity_1.Competencia])],
        controllers: [competencia_controller_1.CompetenciaController],
        providers: [
            competencia_service_1.CompetenciaService,
            {
                provide: competencia_repository_1.CompetenciaRepository,
                useClass: postgres_competencia_repository_1.PostgresCompetenciaRepository,
            },
        ],
    })
], CompetenciaModule);
//# sourceMappingURL=competencia.module.js.map