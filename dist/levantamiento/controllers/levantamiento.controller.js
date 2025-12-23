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
exports.LevantamientoController = void 0;
const common_1 = require("@nestjs/common");
const levantamiento_service_1 = require("../services/levantamiento.service");
const create_levantamiento_dto_1 = require("../dto/create-levantamiento.dto");
let LevantamientoController = class LevantamientoController {
    levantamientoService;
    constructor(levantamientoService) {
        this.levantamientoService = levantamientoService;
    }
    create(createLevantamientoDto) {
        return this.levantamientoService.create(createLevantamientoDto);
    }
    findAll(competenciaId) {
        return this.levantamientoService.findAll(competenciaId ? +competenciaId : undefined);
    }
    findByParticipante(id) {
        return this.levantamientoService.findByParticipante(id);
    }
};
exports.LevantamientoController = LevantamientoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_levantamiento_dto_1.CreateLevantamientoDto]),
    __metadata("design:returntype", void 0)
], LevantamientoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('competenciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LevantamientoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('participante/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LevantamientoController.prototype, "findByParticipante", null);
exports.LevantamientoController = LevantamientoController = __decorate([
    (0, common_1.Controller)('levantamiento'),
    __metadata("design:paramtypes", [levantamiento_service_1.LevantamientoService])
], LevantamientoController);
//# sourceMappingURL=levantamiento.controller.js.map