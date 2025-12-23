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
exports.Participante = void 0;
const typeorm_1 = require("typeorm");
const competencia_entity_1 = require("../../competencia/entities/competencia.entity");
const intento_entity_1 = require("../../intento/entities/intento.entity");
let Participante = class Participante {
    id;
    nombre;
    apellido;
    peso;
    altura;
    edad;
    competenciaId;
    competencia;
    intentos;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Participante = Participante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Participante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Participante.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Participante.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Participante.prototype, "altura", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Participante.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Participante.prototype, "competenciaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => competencia_entity_1.Competencia, (competencia) => competencia.participantes),
    (0, typeorm_1.JoinColumn)({ name: 'competenciaId' }),
    __metadata("design:type", competencia_entity_1.Competencia)
], Participante.prototype, "competencia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => intento_entity_1.Intento, (intento) => intento.participante),
    __metadata("design:type", Array)
], Participante.prototype, "intentos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Participante.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Participante.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Participante.prototype, "deletedAt", void 0);
exports.Participante = Participante = __decorate([
    (0, typeorm_1.Entity)()
], Participante);
//# sourceMappingURL=participante.entity.js.map