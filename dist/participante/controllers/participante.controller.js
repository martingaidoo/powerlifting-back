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
exports.ParticipanteController = void 0;
const common_1 = require("@nestjs/common");
const participante_service_1 = require("../services/participante.service");
const create_participante_dto_1 = require("../dtos/create-participante.dto");
const update_participante_dto_1 = require("../dtos/update-participante.dto");
let ParticipanteController = class ParticipanteController {
    participanteService;
    constructor(participanteService) {
        this.participanteService = participanteService;
    }
    create(createParticipanteDto) {
        return this.participanteService.create(createParticipanteDto);
    }
    findAll(competenciaId) {
        return this.participanteService.findAll(competenciaId ? +competenciaId : undefined);
    }
    findOne(id) {
        return this.participanteService.findOne(id);
    }
    update(id, updateParticipanteDto) {
        return this.participanteService.update(id, updateParticipanteDto);
    }
    remove(id) {
        return this.participanteService.remove(id);
    }
};
exports.ParticipanteController = ParticipanteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_participante_dto_1.CreateParticipanteDto]),
    __metadata("design:returntype", void 0)
], ParticipanteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('competenciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ParticipanteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipanteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_participante_dto_1.UpdateParticipanteDto]),
    __metadata("design:returntype", void 0)
], ParticipanteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ParticipanteController.prototype, "remove", null);
exports.ParticipanteController = ParticipanteController = __decorate([
    (0, common_1.Controller)('participante'),
    __metadata("design:paramtypes", [participante_service_1.ParticipanteService])
], ParticipanteController);
//# sourceMappingURL=participante.controller.js.map