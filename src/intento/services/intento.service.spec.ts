import { Test, TestingModule } from '@nestjs/testing';
import { IntentoService } from './intento.service';
import { IntentoRepository } from '../repositories/intento.repository';
import { TipoMovimiento, ResultadoIntento, Intento } from '../entities/intento.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ParticipanteRepository } from '../../participante/repositories/participante.repository';

const mockIntentoRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findByParticipante: jest.fn(),
    findOne: jest.fn(),
    findByParticipanteAndTipoAndNumero: jest.fn(),
};

const mockParticipanteRepository = {
    findOne: jest.fn(),
};

describe('IntentoService', () => {
    let service: IntentoService;
    let repository: typeof mockIntentoRepository;
    let participanteRepository: typeof mockParticipanteRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IntentoService,
                {
                    provide: IntentoRepository,
                    useValue: mockIntentoRepository,
                },
                {
                    provide: ParticipanteRepository,
                    useValue: mockParticipanteRepository,
                },
            ],
        }).compile();

        service = module.get<IntentoService>(IntentoService);
        repository = module.get(IntentoRepository);
        participanteRepository = module.get(ParticipanteRepository);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new intento if valid', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };

            participanteRepository.findOne.mockResolvedValue({
                id: 1,
                participaSentadilla: true
            });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValue(null); // ensure uniqueness
            repository.create.mockResolvedValue({ id: 1, ...dto, resultado: ResultadoIntento.PENDIENTE } as Intento);

            const result = await service.create(dto);

            expect(result).toEqual(expect.objectContaining(dto));
            expect(repository.create).toHaveBeenCalledWith(dto);
        });

        it('should throw BadRequestException if participant does not compete in discipline', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };

            participanteRepository.findOne.mockResolvedValue({
                id: 1,
                participaSentadilla: false // Not competing
            });

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if weight is not multiple of 2.5', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 101 }; // Invalid weight
            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if intento already exists', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };

            participanteRepository.findOne.mockResolvedValue({ id: 1, participaSentadilla: true });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValue({}); // Found existing

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if previous attempt does not exist for attempt > 1', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 110 };

            participanteRepository.findOne.mockResolvedValue({ id: 1, participaSentadilla: true });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(null); // Uniqueness check: OK
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(null); // Previous attempt check: Not Found

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should valid progression: Attempt 2 >= Attempt 1 + 2.5 (if prev EXITO)', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 105 };
            const prev = { id: 1, peso: 100, resultado: ResultadoIntento.EXITO };

            participanteRepository.findOne.mockResolvedValue({ id: 1, participaSentadilla: true });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(null); // Uniqueness check
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(prev); // Previous attempt check

            repository.create.mockResolvedValue({ id: 2, ...dto } as Intento);

            await expect(service.create(dto)).resolves.toBeDefined();
        });

        it('should throw BadRequestException: Attempt 2 < Attempt 1 + 2.5 (if prev EXITO)', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 102.5 }; // Only +2.5 allowed

            const dtoFail = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 100 };

            const prev = { id: 1, peso: 100, resultado: ResultadoIntento.EXITO };

            participanteRepository.findOne.mockResolvedValue({ id: 1, participaSentadilla: true });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(null);
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(prev);

            await expect(service.create(dtoFail)).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if Attempt 2 < Attempt 1 (if prev FALLO)', async () => {
            const dto = { participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 97.5 };
            const prev = { id: 1, peso: 100, resultado: ResultadoIntento.FALLO };

            participanteRepository.findOne.mockResolvedValue({ id: 1, participaSentadilla: true });
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(null);
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValueOnce(prev);

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update an existing intento', async () => {
            const id = 1;
            const dto = { peso: 105 };
            const existing = { id, participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };

            repository.findOne.mockResolvedValue(existing);
            repository.update.mockResolvedValue({ ...existing, ...dto } as Intento);

            // update checks if number > 1 for progression. Here num=1, so no progression check.
            const result = await service.update(id, dto);

            expect(result.peso).toBe(105);
            expect(repository.update).toHaveBeenCalledWith(id, dto);
        });

        it('should throw NotFoundException if intento does not exist', async () => {
            repository.findOne.mockResolvedValue(null);
            await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
        });

        it('should validate 2.5kg rule on update', async () => {
            const id = 1;
            const dto = { peso: 101 };
            const existing = { id, participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 1, peso: 100 };
            repository.findOne.mockResolvedValue(existing);

            await expect(service.update(id, dto)).rejects.toThrow(BadRequestException);
        });

        it('should validate progression on update', async () => {
            const id = 2;
            const dto = { peso: 100 }; // Updating attempt 2 to 100kg
            const intent2 = { id: 2, participanteId: 1, tipo: TipoMovimiento.SENTADILLA, numero: 2, peso: 105 };
            // Attempt 1 was 100kg EXITO. So Attempt 2 must be >= 102.5
            const intent1 = { id: 1, peso: 100, resultado: ResultadoIntento.EXITO };

            repository.findOne.mockResolvedValue(intent2);
            repository.findByParticipanteAndTipoAndNumero.mockResolvedValue(intent1);

            await expect(service.update(id, dto)).rejects.toThrow(BadRequestException);
        });
    });
});
