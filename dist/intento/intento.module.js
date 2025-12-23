"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const intento_controller_1 = require("./controllers/intento.controller");
const intento_service_1 = require("./services/intento.service");
const intento_entity_1 = require("./entities/intento.entity");
const intento_repository_1 = require("./repositories/intento.repository");
const postgres_intento_repository_1 = require("./repositories/postgres-intento.repository");
const participante_module_1 = require("../participante/participante.module");
let IntentoModule = class IntentoModule {
};
exports.IntentoModule = IntentoModule;
exports.IntentoModule = IntentoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([intento_entity_1.Intento]), participante_module_1.ParticipanteModule],
        controllers: [intento_controller_1.IntentoController],
        providers: [
            intento_service_1.IntentoService,
            {
                provide: intento_repository_1.IntentoRepository,
                useClass: postgres_intento_repository_1.PostgresIntentoRepository,
            },
        ],
        exports: [intento_service_1.IntentoService],
    })
], IntentoModule);
//# sourceMappingURL=intento.module.js.map