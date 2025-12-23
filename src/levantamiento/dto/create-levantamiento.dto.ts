import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { TipoMovimiento } from '../../intento/entities/intento.entity';

export class CreateLevantamientoDto {
    @IsNotEmpty()
    @IsNumber()
    participanteId: number;

    @IsNotEmpty()
    @IsEnum(TipoMovimiento)
    tipo: TipoMovimiento;

    @IsNotEmpty()
    @IsNumber()
    peso1: number;

    @IsNotEmpty()
    @IsNumber()
    peso2: number;

    @IsNotEmpty()
    @IsNumber()
    peso3: number;
}
