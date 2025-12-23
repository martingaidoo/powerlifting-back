import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Levantamiento } from './entities/levantamiento.entity';
import { LevantamientoService } from './services/levantamiento.service';
import { LevantamientoController } from './controllers/levantamiento.controller';
import { ParticipanteModule } from '../participante/participante.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Levantamiento]),
        ParticipanteModule,
    ],
    controllers: [LevantamientoController],
    providers: [LevantamientoService],
    exports: [LevantamientoService],
})
export class LevantamientoModule { }
