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
exports.IntentoController = void 0;
const common_1 = require("@nestjs/common");
const intento_service_1 = require("../services/intento.service");
const create_intento_dto_1 = require("../dtos/create-intento.dto");
const update_intento_dto_1 = require("../dtos/update-intento.dto");
let IntentoController = class IntentoController {
    intentoService;
    constructor(intentoService) {
        this.intentoService = intentoService;
    }
    async create(createIntentoDto) {
        return this.intentoService.create(createIntentoDto);
    }
    async update(id, updateIntentoDto) {
        return this.intentoService.update(id, updateIntentoDto);
    }
    async findAll(competenciaId) {
        return this.intentoService.findAll(competenciaId ? +competenciaId : undefined);
    }
    async findByParticipante(participanteId) {
        return this.intentoService.findByParticipante(participanteId);
    }
};
exports.IntentoController = IntentoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_intento_dto_1.CreateIntentoDto]),
    __metadata("design:returntype", Promise)
], IntentoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_intento_dto_1.UpdateIntentoDto]),
    __metadata("design:returntype", Promise)
], IntentoController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('competenciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('participante/:participanteId'),
    __param(0, (0, common_1.Param)('participanteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IntentoController.prototype, "findByParticipante", null);
exports.IntentoController = IntentoController = __decorate([
    (0, common_1.Controller)('intentos'),
    __metadata("design:paramtypes", [intento_service_1.IntentoService])
], IntentoController);
//# sourceMappingURL=intento.controller.js.map