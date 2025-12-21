import { Test, TestingModule } from '@nestjs/testing';
import { CompetenciaService } from './competencia.service';
import { CompetenciaRepository } from '../repositories/competencia.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateCompetenciaDto } from '../dtos/create-competencia.dto';
import { UpdateCompetenciaDto } from '../dtos/update-competencia.dto';

describe('CompetenciaService', () => {
    let service: CompetenciaService;
    let repository: CompetenciaRepository;

    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompetenciaService,
                {
                    provide: CompetenciaRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<CompetenciaService>(CompetenciaService);
        repository = module.get<CompetenciaRepository>(CompetenciaRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a competencia', async () => {
            const dto: CreateCompetenciaDto = { nombre: 'Test', fecha: '2023-10-10', hora: '10:00:00', fase: 1 };
            const result = { id: 1, ...dto, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
            mockRepository.create.mockResolvedValue(result);

            expect(await service.create(dto)).toEqual(result);
            expect(mockRepository.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return an array of competencias', async () => {
            const result = [{ id: 1, nombre: 'Test' }];
            mockRepository.findAll.mockResolvedValue(result);

            expect(await service.findAll()).toEqual(result);
        });
    });

    describe('findOne', () => {
        it('should return a competencia by id', async () => {
            const result = { id: 1, nombre: 'Test' };
            mockRepository.findOne.mockResolvedValue(result);

            expect(await service.findOne(1)).toEqual(result);
        });

        it('should throw NotFoundException if not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a competencia', async () => {
            const dto: UpdateCompetenciaDto = { nombre: 'Updated' };
            const result = { id: 1, ...dto };
            mockRepository.update.mockResolvedValue(result);

            expect(await service.update(1, dto)).toEqual(result);
            expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
        });
    });

    describe('remove', () => {
        it('should delete a competencia', async () => {
            mockRepository.remove.mockResolvedValue(undefined);
            await expect(service.remove(1)).resolves.not.toThrow();
            expect(mockRepository.remove).toHaveBeenCalledWith(1);
        });
    });
});
