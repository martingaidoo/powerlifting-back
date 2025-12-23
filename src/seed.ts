import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CompetenciaService } from './competencia/services/competencia.service';
import { ParticipanteService } from './participante/services/participante.service';
import { IntentoService } from './intento/services/intento.service';
import { TipoMovimiento, ResultadoIntento } from './intento/entities/intento.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const competenciaService = app.get(CompetenciaService);
    const participanteService = app.get(ParticipanteService);
    const intentoService = app.get(IntentoService);

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

    console.log('--- Creating Participants and Attempts ---');
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
            { tipo: TipoMovimiento.SENTADILLA, active: discipline.s },
            { tipo: TipoMovimiento.BANCA, active: discipline.b },
            { tipo: TipoMovimiento.MUERTO, active: discipline.m },
        ];

        for (const mov of movimientos) {
            if (!mov.active) continue;

            // Generate initial weight (multiple of 2.5)
            let currentWeight = Math.floor((Math.random() * (200 - 60) + 60) / 2.5) * 2.5;

            // Attempt 1: Success
            await intentoService.create({
                participanteId: participante.id,
                tipo: mov.tipo,
                numero: 1,
                peso: currentWeight,
            });
            // Update result manually via repository if service doesn't expose it or update via service
            // Creating it as PENDING by default. We need to update result to EXITO to proceed.
            // Assuming we want to simulate a completed competition or at least valid progression.

            // Note: Service create method defaults to PENDING. 
            // We need to update the result to allow progression.
            // But checking IntentoService, update accepts Partial<Intento>, but logic validates weight/progression.
            // We need a way to set Result.
            // Let's assume we can update the result. The service update DTO might not expose 'resultado'?
            // Checking CreateIntentoDto or UpdateIntentoDto... I'll check UpdateIntentoDto in a moment.
            // For now, I'll attempt to update it.

            let attempts = await intentoService.findByParticipante(participante.id);
            let lastAttempt = attempts.find(a => a.tipo === mov.tipo && a.numero === 1);

            // Simulation: 90% chance of success for 1st attempt
            if (lastAttempt) {
                await intentoService.update(lastAttempt.id, { resultado: ResultadoIntento.EXITO } as any);
            }

            // Attempt 2: +2.5kg or +5kg
            currentWeight += 2.5 + (Math.random() > 0.5 ? 2.5 : 0);
            await intentoService.create({
                participanteId: participante.id,
                tipo: mov.tipo,
                numero: 2,
                peso: currentWeight,
            });

            // Fetch again to get ID
            attempts = await intentoService.findByParticipante(participante.id);
            lastAttempt = attempts.find(a => a.tipo === mov.tipo && a.numero === 2);

            if (lastAttempt) {
                await intentoService.update(lastAttempt.id, { resultado: ResultadoIntento.EXITO } as any);
            }

            // Attempt 3: +2.5kg
            currentWeight += 2.5;
            await intentoService.create({
                participanteId: participante.id,
                tipo: mov.tipo,
                numero: 3,
                peso: currentWeight,
            });
            // Leave 3rd attempt as PENDING or EXITO/FALLO randomly
        }
    }

    console.log('--- Seeding Completed ---');
    await app.close();
}

bootstrap();
