import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciaService } from './services/competencia.service';
import { CompetenciaController } from './controllers/competencia.controller';
import { Competencia } from './entities/competencia.entity';
import { CompetenciaRepository } from './repositories/competencia.repository';
import { PostgresCompetenciaRepository } from './repositories/postgres-competencia.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Competencia])],
    controllers: [CompetenciaController],
    providers: [
        CompetenciaService,
        {
            provide: CompetenciaRepository,
            useClass: PostgresCompetenciaRepository,
        },
    ],
})
export class CompetenciaModule { }
