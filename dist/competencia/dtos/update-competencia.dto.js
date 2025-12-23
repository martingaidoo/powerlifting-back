"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompetenciaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_competencia_dto_1 = require("./create-competencia.dto");
class UpdateCompetenciaDto extends (0, mapped_types_1.PartialType)(create_competencia_dto_1.CreateCompetenciaDto) {
}
exports.UpdateCompetenciaDto = UpdateCompetenciaDto;
//# sourceMappingURL=update-competencia.dto.js.map