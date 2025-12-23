import { IsEnum, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { TipoMovimiento } from '../entities/intento.entity';

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
}
