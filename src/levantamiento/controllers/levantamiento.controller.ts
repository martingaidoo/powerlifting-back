import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LevantamientoService } from '../services/levantamiento.service';
import { CreateLevantamientoDto } from '../dto/create-levantamiento.dto';

@Controller('levantamiento')
export class LevantamientoController {
    constructor(private readonly levantamientoService: LevantamientoService) { }

    @Post()
    create(@Body() createLevantamientoDto: CreateLevantamientoDto) {
        return this.levantamientoService.create(createLevantamientoDto);
    }

    @Get('participante/:id')
    findByParticipante(@Param('id', ParseIntPipe) id: number) {
        return this.levantamientoService.findByParticipante(id);
    }
}
