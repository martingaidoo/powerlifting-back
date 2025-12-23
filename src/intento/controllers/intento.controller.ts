import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { IntentoService } from '../services/intento.service';
import { CreateIntentoDto } from '../dtos/create-intento.dto';
import { UpdateIntentoDto } from '../dtos/update-intento.dto';

@Controller('intentos')
export class IntentoController {
    constructor(private readonly intentoService: IntentoService) { }

    @Post()
    async create(@Body() createIntentoDto: CreateIntentoDto) {
        return this.intentoService.create(createIntentoDto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateIntentoDto: UpdateIntentoDto,
    ) {
        return this.intentoService.update(id, updateIntentoDto);
    }

    @Get('participante/:participanteId')
    async findByParticipante(
        @Param('participanteId', ParseIntPipe) participanteId: number,
    ) {
        return this.intentoService.findByParticipante(participanteId);
    }
}
