import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CompetenciaService } from '../services/competencia.service';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';

@Controller('competencia')
export class CompetenciaController {
    constructor(private readonly competenciaService: CompetenciaService) { }

    @Post()
    create(@Body() createCompetenciaDto: CreateCompetenciaDto) {
        return this.competenciaService.create(createCompetenciaDto);
    }

    @Get()
    findAll() {
        return this.competenciaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.competenciaService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCompetenciaDto: UpdateCompetenciaDto) {
        return this.competenciaService.update(id, updateCompetenciaDto);
    }

    @Put(':id')
    replace(@Param('id', ParseIntPipe) id: number, @Body() updateCompetenciaDto: UpdateCompetenciaDto) {
        return this.competenciaService.update(id, updateCompetenciaDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.competenciaService.remove(id);
    }
}
