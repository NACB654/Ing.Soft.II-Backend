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
const mockKeywordsService = {findOrCreateKewords: jest.fn()};
const mockODSService = {findODSbyId: jest.fn()};
const mockAlumnosService = {findOrCreateAlumno: jest.fn()};
const mockAsesoresService = {findOrCreateAsesor: jest.fn()};
const mockTrabajoModel = { create: jest.fn() };

describe('ProfesoresService', () => {
  let service: ProfesoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesoresService,
        { provide: getModelToken(Profesor), useValue: mockProfesorRepository },
        { provide: getModelToken(TrabajosInvestigacion), useValue: mockTrabajoModel }, 
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

  describe('Buscar profesor', () => {
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
  })

  describe("Subir trabajo", () => {
    const mockTrabajo = {
      titulo: 'Trabajo de prueba',
      abstract: 'Este es un abstract de prueba',
      archivo_url: 'http://archivo.com/archivo.pdf',
      keywords: ['keyword1', 'keyword2'],
      ods: [1],
      alumno: {name: "Alumno", last_name: "Prueba"},
      asesor: {name: "Asesor", last_name: "Prueba"},
      profesor: 'Profesor Prueba',
      subareaId: 1,
      cursoId: 1,
      periodoId: 1,
      puntaje: 0
    };

    it('debe subir un trabajo correctamente', async () => {
      const mockKeywords = [{ id: 1, name: 'keyword1' }, { id: 2, name: 'keyword2' }];
      const mockOds = [{ id: 1, name: 'ODS1' }];
      const mockAlumno = {id: 1, name: "Alumno", last_name: "Prueba"};
      const mockAsesor = {id: 1, name: "Asesor", last_name: "Prueba"};
      const mockProfesor = { id: 1, name: 'Profesor Prueba' };
      const mockCreatedTrabajo = { id: 1, $set: jest.fn() };

      mockKeywordsService.findOrCreateKewords = jest.fn().mockResolvedValue(mockKeywords);
      mockODSService.findODSbyId = jest.fn().mockResolvedValue(mockOds);
      mockAlumnosService.findOrCreateAlumno = jest.fn().mockResolvedValue(mockAlumno);
      mockAsesoresService.findOrCreateAsesor = jest.fn().mockResolvedValue(mockAsesor);
      mockProfesorRepository.findOne.mockResolvedValue(mockProfesor);
      mockTrabajoModel.create.mockResolvedValue(mockCreatedTrabajo);

      const result = await service.subirTrabajo(mockTrabajo);

      expect(result).toEqual(mockCreatedTrabajo);
      expect(mockCreatedTrabajo.$set).toHaveBeenCalledWith('keywords', mockKeywords);
      expect(mockCreatedTrabajo.$set).toHaveBeenCalledWith('ods', mockOds);
    });

    it('debe retornar null si ocurre un error al subir el trabajo', async () => {
      mockKeywordsService.findOrCreateKewords = jest.fn().mockRejectedValue(new Error('Error al crear keywords'));
      const result = await service.subirTrabajo(mockTrabajo);
      expect(result).toBeNull();
    });

    it('debe retornar null si no encuentra el profesor', async () => {
      mockProfesorRepository.findOne.mockResolvedValue(null);
      const result = await service.subirTrabajo(mockTrabajo);
      expect(result).toBeNull();
    });
  })
});
