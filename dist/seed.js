"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const competencia_service_1 = require("./competencia/services/competencia.service");
const participante_service_1 = require("./participante/services/participante.service");
const levantamiento_service_1 = require("./levantamiento/services/levantamiento.service");
const intento_entity_1 = require("./intento/entities/intento.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const competenciaService = app.get(competencia_service_1.CompetenciaService);
    const participanteService = app.get(participante_service_1.ParticipanteService);
    const levantamientoService = app.get(levantamiento_service_1.LevantamientoService);
    console.log('--- Creating Competition ---');
    const competencia = await competenciaService.create({
        nombre: 'Torneo Iniciación 2024',
        fecha: new Date().toISOString().split('T')[0],
        hora: '10:00:00',
        fase: 1
    });
    console.log('Competition created:', competencia.id);
    const disciplines = [
        { s: true, b: true, m: true },
        { s: true, b: false, m: false },
        { s: false, b: true, m: false },
        { s: false, b: false, m: true },
        { s: true, b: true, m: false },
        { s: false, b: true, m: true },
    ];
    console.log('--- Creating Participants and Levantamientos ---');
    for (let i = 1; i <= 20; i++) {
        const discipline = disciplines[Math.floor(Math.random() * disciplines.length)];
        const participante = await participanteService.create({
            nombre: `Participante`,
            apellido: `${i}`,
            edad: Math.floor(Math.random() * (40 - 18 + 1)) + 18,
            peso: Number((Math.random() * (120 - 50) + 50).toFixed(1)),
            altura: Number((Math.random() * (190 - 150) + 150).toFixed(0)),
            competenciaId: competencia.id,
            participaSentadilla: discipline.s,
            participaBanca: discipline.b,
            participaMuerto: discipline.m,
        });
        console.log(`Created Participante ${i} (ID: ${participante.id}) [S:${discipline.s} B:${discipline.b} M:${discipline.m}]`);
        const movimientos = [
            { tipo: intento_entity_1.TipoMovimiento.SENTADILLA, active: discipline.s },
            { tipo: intento_entity_1.TipoMovimiento.BANCA, active: discipline.b },
            { tipo: intento_entity_1.TipoMovimiento.MUERTO, active: discipline.m },
        ];
        for (const mov of movimientos) {
            if (!mov.active)
                continue;
            let w1 = Math.floor((Math.random() * (200 - 60) + 60) / 2.5) * 2.5;
            let w2 = w1 + 2.5 + (Math.random() > 0.5 ? 2.5 : 0);
            let w3 = w2 + 2.5;
            await levantamientoService.create({
                participanteId: participante.id,
                tipo: mov.tipo,
                peso1: w1,
                peso2: w2,
                peso3: w3,
            });
            console.log(`Created Levantamiento for ${mov.tipo}: ${w1}, ${w2}, ${w3}`);
        }
    }
    console.log('--- Seeding Completed ---');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map