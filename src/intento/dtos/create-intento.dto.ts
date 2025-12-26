import { IsEnum, IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { ResultadoIntento, TipoMovimiento } from '../entities/intento.entity';

export class CreateIntentoDto {
    @IsNumber()
    @IsPositive()
    participanteId: number;

    @IsEnum(TipoMovimiento)
    tipo: TipoMovimiento;

    @IsNumber()
    @Min(1)
    @Max(3)
    numero: number;

    @IsNumber()
    @IsPositive()
    peso: number;

    @IsEnum(ResultadoIntento)
    @IsOptional()
    resultado?: ResultadoIntento;
}
