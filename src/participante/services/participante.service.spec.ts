import { Test, TestingModule } from '@nestjs/testing';
import { ParticipanteService } from './participante.service';
import { ParticipanteRepository } from '../repositories/participante.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';
import { UpdateParticipanteDto } from '../dtos/update-participante.dto';

describe('ParticipanteService', () => {
    let service: ParticipanteService;
    let repository: ParticipanteRepository;

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
                ParticipanteService,
                {
                    provide: ParticipanteRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ParticipanteService>(ParticipanteService);
        repository = module.get<ParticipanteRepository>(ParticipanteRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a participant', async () => {
            const dto: CreateParticipanteDto = { nombre: 'Juan', apellido: 'Perez', competenciaId: 1, peso: 70 };
            const result = { id: 1, ...dto, createdAt: new Date() };
            mockRepository.create.mockResolvedValue(result);

            expect(await service.create(dto)).toEqual(result);
            expect(mockRepository.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return all participants', async () => {
            const result = [{ id: 1, nombre: 'Juan' }];
            mockRepository.findAll.mockResolvedValue(result);
            expect(await service.findAll()).toEqual(result);
        });
        it('should return participants by competenciaId', async () => {
            const result = [{ id: 1, nombre: 'Juan', competenciaId: 1 }];
            mockRepository.findAll.mockResolvedValue(result);
            expect(await service.findAll(1)).toEqual(result);
            expect(mockRepository.findAll).toHaveBeenCalledWith(1);
        });
    });

    describe('findOne', () => {
        it('should return a participant by id', async () => {
            const result = { id: 1, nombre: 'Juan' };
            mockRepository.findOne.mockResolvedValue(result);
            expect(await service.findOne(1)).toEqual(result);
        });

        it('should throw if not found', async () => {
            mockRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });
});
