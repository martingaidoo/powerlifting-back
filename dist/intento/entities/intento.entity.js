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
exports.Intento = exports.ResultadoIntento = exports.TipoMovimiento = void 0;
const typeorm_1 = require("typeorm");
const participante_entity_1 = require("../../participante/entities/participante.entity");
var TipoMovimiento;
(function (TipoMovimiento) {
    TipoMovimiento["SENTADILLA"] = "SENTADILLA";
    TipoMovimiento["BANCA"] = "BANCA";
    TipoMovimiento["MUERTO"] = "MUERTO";
})(TipoMovimiento || (exports.TipoMovimiento = TipoMovimiento = {}));
var ResultadoIntento;
(function (ResultadoIntento) {
    ResultadoIntento["PENDIENTE"] = "PENDIENTE";
    ResultadoIntento["EXITO"] = "EXITO";
    ResultadoIntento["FALLO"] = "FALLO";
})(ResultadoIntento || (exports.ResultadoIntento = ResultadoIntento = {}));
let Intento = class Intento {
    id;
    participanteId;
    participante;
    tipo;
    numero;
    peso;
    resultado;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Intento = Intento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Intento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Intento.prototype, "participanteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participante_entity_1.Participante, (participante) => participante.intentos),
    (0, typeorm_1.JoinColumn)({ name: 'participanteId' }),
    __metadata("design:type", participante_entity_1.Participante)
], Intento.prototype, "participante", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoMovimiento,
    }),
    __metadata("design:type", String)
], Intento.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Intento.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Intento.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ResultadoIntento,
        default: ResultadoIntento.PENDIENTE,
    }),
    __metadata("design:type", String)
], Intento.prototype, "resultado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Intento.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Intento.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Intento.prototype, "deletedAt", void 0);
exports.Intento = Intento = __decorate([
    (0, typeorm_1.Entity)()
], Intento);
//# sourceMappingURL=intento.entity.js.map