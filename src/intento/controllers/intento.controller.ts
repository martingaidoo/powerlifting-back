import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
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

    @Get()
    async findAll(@Query('competenciaId') competenciaId?: string) {
        return this.intentoService.findAll(competenciaId ? +competenciaId : undefined);
    }

    @Get('participante/:participanteId')
    async findByParticipante(
        @Param('participanteId', ParseIntPipe) participanteId: number,
    ) {
        return this.intentoService.findByParticipante(participanteId);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.intentoService.delete(id);
    }
}
