"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevantamientoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const levantamiento_entity_1 = require("./entities/levantamiento.entity");
const levantamiento_service_1 = require("./services/levantamiento.service");
const levantamiento_controller_1 = require("./controllers/levantamiento.controller");
const participante_module_1 = require("../participante/participante.module");
let LevantamientoModule = class LevantamientoModule {
};
exports.LevantamientoModule = LevantamientoModule;
exports.LevantamientoModule = LevantamientoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([levantamiento_entity_1.Levantamiento]),
            participante_module_1.ParticipanteModule,
        ],
        controllers: [levantamiento_controller_1.LevantamientoController],
        providers: [levantamiento_service_1.LevantamientoService],
        exports: [levantamiento_service_1.LevantamientoService],
    })
], LevantamientoModule);
//# sourceMappingURL=levantamiento.module.js.map