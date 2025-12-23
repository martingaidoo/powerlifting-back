"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipanteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const participante_service_1 = require("./services/participante.service");
const participante_controller_1 = require("./controllers/participante.controller");
const participante_entity_1 = require("./entities/participante.entity");
const participante_repository_1 = require("./repositories/participante.repository");
const postgres_participante_repository_1 = require("./repositories/postgres-participante.repository");
let ParticipanteModule = class ParticipanteModule {
};
exports.ParticipanteModule = ParticipanteModule;
exports.ParticipanteModule = ParticipanteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([participante_entity_1.Participante])],
        controllers: [participante_controller_1.ParticipanteController],
        providers: [
            participante_service_1.ParticipanteService,
            {
                provide: participante_repository_1.ParticipanteRepository,
                useClass: postgres_participante_repository_1.PostgresParticipanteRepository,
            },
        ],
        exports: [participante_repository_1.ParticipanteRepository],
    })
], ParticipanteModule);
//# sourceMappingURL=participante.module.js.map