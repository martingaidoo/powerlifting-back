import { IsString, IsNotEmpty, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateParticipanteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    peso?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    altura?: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    edad?: number;

    @IsInt()
    @IsNotEmpty()
    competenciaId: number;
}
