import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CompetenciaService } from './competencia/services/competencia.service';
import { ParticipanteService } from './participante/services/participante.service';
import { LevantamientoService } from './levantamiento/services/levantamiento.service';
import { TipoMovimiento } from './intento/entities/intento.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const competenciaService = app.get(CompetenciaService);
    const participanteService = app.get(ParticipanteService);
    const levantamientoService = app.get(LevantamientoService);

    console.log('--- Creating Competition ---');
    const competencia = await competenciaService.create({
        nombre: 'Torneo Iniciación 2024',
        fecha: new Date().toISOString().split('T')[0],
        hora: '10:00:00',
        fase: 1
    });
    console.log('Competition created:', competencia.id);

    const disciplines = [
        { s: true, b: true, m: true }, // Todos
        { s: true, b: false, m: false }, // Solo Sentadilla
        { s: false, b: true, m: false }, // Solo Banca
        { s: false, b: false, m: true }, // Solo Muerto
        { s: true, b: true, m: false }, // Sentadilla + Banca
        { s: false, b: true, m: true }, // Banca + Muerto
    ];

    console.log('--- Creating Participants and Levantamientos ---');
    for (let i = 1; i <= 13; i++) {
        const discipline = disciplines[Math.floor(Math.random() * disciplines.length)];

        // Categorias de peso masculino: -66, -74, -83, -93, -105, -120
        const weightCategories = [
            { min: 55.0, max: 66.0 },
            { min: 66.1, max: 74.0 },
            { min: 74.1, max: 83.0 },
            { min: 83.1, max: 93.0 },
            { min: 93.1, max: 105.0 },
            { min: 105.1, max: 120.0 },
        ];
        const category = weightCategories[Math.floor(Math.random() * weightCategories.length)];
        const peso = Math.floor((Math.random() * (category.max - category.min) + category.min) * 10) / 10;

        const participante = await participanteService.create({
            nombre: `Participante`,
            apellido: `${i}`,
            edad: Math.floor(Math.random() * (40 - 18 + 1)) + 18,
            peso: peso,
            altura: Number((Math.random() * (190 - 150) + 150).toFixed(0)),
            competenciaId: competencia.id,
            participaSentadilla: discipline.s,
            participaBanca: discipline.b,
            participaMuerto: discipline.m,
        });

        console.log(`Created Participante ${i} (ID: ${participante.id}) [S:${discipline.s} B:${discipline.b} M:${discipline.m}]`);

        const movimientos = [
            { tipo: TipoMovimiento.SENTADILLA, active: discipline.s },
            { tipo: TipoMovimiento.BANCA, active: discipline.b },
            { tipo: TipoMovimiento.MUERTO, active: discipline.m },
        ];

        for (const mov of movimientos) {
            if (!mov.active) continue;

            // Generate initial weight (multiple of 2.5)
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
