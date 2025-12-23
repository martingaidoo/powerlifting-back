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
exports.Competencia = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participante/entities/participante.entity");
let Competencia = class Competencia {
    id;
    nombre;
    fecha;
    hora;
    fase;
    participantes;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Competencia = Competencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Competencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Competencia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Competencia.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Competencia.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Competencia.prototype, "fase", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participante_entity_1.Participante, (participante) => participante.competencia),
    __metadata("design:type", Array)
], Competencia.prototype, "participantes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Competencia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Competencia.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Competencia.prototype, "deletedAt", void 0);
exports.Competencia = Competencia = __decorate([
    (0, typeorm_1.Entity)()
], Competencia);
//# sourceMappingURL=competencia.entity.js.map