import { IsEnum, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { ResultadoIntento } from '../entities/intento.entity';

export class UpdateIntentoDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    peso?: number;

    @IsEnum(ResultadoIntento)
    @IsOptional()
    resultado?: ResultadoIntento;
}
