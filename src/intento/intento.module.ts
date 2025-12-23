import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntentoController } from './controllers/intento.controller';
import { IntentoService } from './services/intento.service';
import { Intento } from './entities/intento.entity';
import { IntentoRepository } from './repositories/intento.repository';
import { PostgresIntentoRepository } from './repositories/postgres-intento.repository';

import { ParticipanteModule } from '../participante/participante.module';

@Module({
    imports: [TypeOrmModule.forFeature([Intento]), ParticipanteModule],
    controllers: [IntentoController],
    providers: [
        IntentoService,
        {
            provide: IntentoRepository,
            useClass: PostgresIntentoRepository,
        },
    ],
    exports: [IntentoService],
})
export class IntentoModule { }
