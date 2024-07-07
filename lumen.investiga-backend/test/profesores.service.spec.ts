// profesores.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { Profesor } from 'src/profesores/profesores.model';
import { KeywordsService } from 'src/keywords/keywords.service';
import { ODSservice } from 'src/ods/ods.service';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { AsesoresService } from 'src/asesores/asesores.service';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

// Mocks de los repositorios y servicios
const mockProfesorRepository = { findOne: jest.fn() };
const mockKeywordsService = {};
const mockODSService = {};
const mockAlumnosService = {};
const mockAsesoresService = {};

describe('ProfesoresService', () => {
  let service: ProfesoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesoresService,
        { provide: getModelToken(Profesor), useValue: mockProfesorRepository },
        { provide: getModelToken(TrabajosInvestigacion), useValue: {} }, 
        { provide: KeywordsService, useValue: mockKeywordsService },
        { provide: ODSservice, useValue: mockODSService },
        { provide: AlumnosService, useValue: mockAlumnosService },
        { provide: AsesoresService, useValue: mockAsesoresService },
      ],
    }).compile();

    service = module.get<ProfesoresService>(ProfesoresService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar un profesor si el nombre coincide', async () => {
    const profeName = 'Juan Perez';
    const expectedProfesor = { id: 1, name: 'Juan Perez' };
    mockProfesorRepository.findOne.mockResolvedValue(expectedProfesor);

    const result = await service.findProfesor(profeName);
    expect(result).toEqual(expectedProfesor);
  });

  it('debe retornar null si no se encuentra el profesor', async () => {
    const profeName = 'Nombre Inexistente';
    mockProfesorRepository.findOne.mockResolvedValue(null);

    const result = await service.findProfesor(profeName);
    expect(result).toBeNull();
  });

  it('debe manejar errores al buscar un profesor', async () => {
    const profeName = 'ErrorPrueba';
    const error = new Error('Error de base de datos');
    mockProfesorRepository.findOne.mockRejectedValue(error);

    await expect(service.findProfesor(profeName)).rejects.toThrow(error);
  });
});
