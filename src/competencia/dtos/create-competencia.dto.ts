import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCompetenciaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsDateString()
    @IsNotEmpty()
    fecha: string;

    @IsString() // Time usually passed as string 'HH:mm:ss'
    @IsNotEmpty()
    hora: string;

    @IsInt()
    @IsNotEmpty()
    fase: number;
}
