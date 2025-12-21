import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ParticipanteService } from '../services/participante.service';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';

@Controller('participante')
export class ParticipanteController {
    constructor(private readonly participanteService: ParticipanteService) { }

    @Post()
    create(@Body() createParticipanteDto: CreateParticipanteDto) {
        return this.participanteService.create(createParticipanteDto);
    }

    @Get()
    findAll(@Query('competenciaId') competenciaId?: string) {
        return this.participanteService.findAll(competenciaId ? +competenciaId : undefined);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.participanteService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateParticipanteDto: UpdateParticipanteDto) {
        return this.participanteService.update(id, updateParticipanteDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.participanteService.remove(id);
    }
}
