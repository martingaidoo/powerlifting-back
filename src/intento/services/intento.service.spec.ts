import { Test, TestingModule } from '@nestjs/testing';
import { IntentoService } from './intento.service';
import { IntentoRepository } from '../repositories/intento.repository';
import { TipoMovimiento, ResultadoIntento, Intento } from '../entities/intento.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockIntentoRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findByParticipante: jest.fn(),
    findOne: jest.fn(),
    findByParticipanteAndTipoAndNumero: jest.fn(),
};

describe('IntentoService', () => {
    let service: IntentoService;
    let repository: typeof mockIntentoRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IntentoService,
                {
                    provide: IntentoRepository,
                    useValue: mockIntentoRepository,
                },
            ],
        }).compile();

        service = module.get<IntentoService>(IntentoService);
        repository = module.get(IntentoRepository);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new intento if it does not exist', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValue(null);
            repository.create.mockResolvedValue({ id: 1, ...dto, resultado: ResultadoIntento.PENDIENTE } as Intento);

            const result = await service.create(dto);

            expect(result).toEqual(expect.objectContaining(dto));
            expect(repository.create).toHaveBeenCalledWith(dto);
        });

        it('should throw BadRequestException if intento already exists', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValue({});

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update an existing intento', async () => {
            const id = 1;
            const dto = { peso: 105 };
            repository.findOne.mockResolvedValue({ id } as Intento);
            repository.update.mockResolvedValue({ id, peso: 105 } as Intento);

            const result = await service.update(id, dto);

            expect(result.peso).toBe(105);
            expect(repository.update).toHaveBeenCalledWith(id, dto);
        });

        it('should throw NotFoundException if intento does not exist', async () => {
            repository.findOne.mockResolvedValue(null);

            await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
        });
    });
});
