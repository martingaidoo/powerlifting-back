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
exports.Levantamiento = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participante/entities/participante.entity");
const intento_entity_1 = require("../../intento/entities/intento.entity");
let Levantamiento = class Levantamiento {
    id;
    participanteId;
    participante;
    tipo;
    peso1;
    peso2;
    peso3;
    createdAt;
    updatedAt;
};
exports.Levantamiento = Levantamiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Levantamiento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Levantamiento.prototype, "participanteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participante_entity_1.Participante, (participante) => participante.levantamientos),
    (0, typeorm_1.JoinColumn)({ name: 'participanteId' }),
    __metadata("design:type", participante_entity_1.Participante)
], Levantamiento.prototype, "participante", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: intento_entity_1.TipoMovimiento,
    }),
    __metadata("design:type", String)
], Levantamiento.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Levantamiento.prototype, "peso1", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Levantamiento.prototype, "peso2", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Levantamiento.prototype, "peso3", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Levantamiento.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Levantamiento.prototype, "updatedAt", void 0);
exports.Levantamiento = Levantamiento = __decorate([
    (0, typeorm_1.Entity)()
], Levantamiento);
//# sourceMappingURL=levantamiento.entity.js.map