import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipanteService } from './services/participante.service';
import { ParticipanteController } from './controllers/participante.controller';
import { Participante } from './entities/participante.entity';
import { ParticipanteRepository } from './repositories/participante.repository';
import { PostgresParticipanteRepository } from './repositories/postgres-participante.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Participante])],
    controllers: [ParticipanteController],
    providers: [
        ParticipanteService,
        {
            provide: ParticipanteRepository,
            useClass: PostgresParticipanteRepository,
        },
    ],
    exports: [ParticipanteRepository],
})
export class ParticipanteModule { }
