// trabajos-investigacion.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { TrabajosInvestigacionService } from 'src/trabajos/trabajos.service';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { Keyword } from 'src/keywords/keywords.model';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { AsesoresService } from 'src/asesores/asesores.service';
import { ODSservice } from 'src/ods/ods.service';
import { PeeriodosService } from 'src/periodos/periodos.service';
import { SubareaService } from 'src/subarea/subarea.service';
import { CursosService } from 'src/cursos/cursos.services';

// Mocks para los servicios y modelos
const mockTrabajoModel = { findAll: jest.fn() };
const mockKeywordModel = {};
const mockProfesoresService = {};
const mockAsesoresService = { totalTrabajosAsesor: jest.fn() };
const mockODSService = { totalTrabajosODS: jest.fn() };
const mockPeriodosService = { totalTrabajosPeriodos: jest.fn() };
const mockSubareaService = { totalTrabajosAreasSubareas: jest.fn() };
const mockCursosService = { totalTrabajosCurso: jest.fn() };

describe('TrabajosInvestigacionService', () => {
  let service: TrabajosInvestigacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrabajosInvestigacionService,
        {
          provide: getModelToken(TrabajosInvestigacion),
          useValue: mockTrabajoModel
        },
        {
          provide: getModelToken(Keyword),
          useValue: mockKeywordModel
        },
        { provide: ProfesoresService, useValue: mockProfesoresService },
        { provide: AsesoresService, useValue: mockAsesoresService },
        { provide: ODSservice, useValue: mockODSService },
        { provide: PeeriodosService, useValue: mockPeriodosService },
        { provide: SubareaService, useValue: mockSubareaService },
        { provide: CursosService, useValue: mockCursosService }
      ],
    }).compile();

    service = module.get<TrabajosInvestigacionService>(TrabajosInvestigacionService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar resultados que coincidan con la palabra clave', async () => {
    const keyword = 'sostenibilidad';
    const resultadosEsperados = [
      { id: 1, titulo: 'Proyecto sobre sostenibilidad' },
      { id: 2, titulo: 'Impacto ambiental y sostenibilidad' }
    ];

    mockTrabajoModel.findAll.mockResolvedValue(resultadosEsperados);

    const result = await service.mostrarResultados(keyword);
    expect(result).toEqual(resultadosEsperados);
  });

  it('debe retornar un array vacío si no hay coincidencias', async () => {
    const keyword = 'inexistente';
    mockTrabajoModel.findAll.mockResolvedValue([]);

    const result = await service.mostrarResultados(keyword);
    expect(result).toEqual([]);
  });

  it('debe manejar errores al buscar los resultados', async () => {
    const keyword = 'error';
    const error = new Error('Error al acceder a la base de datos');

    mockTrabajoModel.findAll.mockRejectedValue(error);

    const result = await service.mostrarResultados(keyword);
    expect(result).toBeNull();
  });


  describe('Visualizar Totales', () => {
    it('debe visualizar totales correctamente', async () => {
      const totalesEsperados = {
        asesores: 10,
        ods: 5,
        periodos: 7,
        areasYSubareas: 3,
        cursos: 8
      };

      mockAsesoresService.totalTrabajosAsesor.mockResolvedValue(10);
      mockODSService.totalTrabajosODS.mockResolvedValue(5);
      mockPeriodosService.totalTrabajosPeriodos.mockResolvedValue(7);
      mockSubareaService.totalTrabajosAreasSubareas.mockResolvedValue(3);
      mockCursosService.totalTrabajosCurso.mockResolvedValue(8);

      const result = await service.visualizarTotales();
      expect(result).toEqual(totalesEsperados);
    });

    it('debe manejar errores al visualizar totales', async () => {
      const error = new Error('Error al acceder a la base de datos');
      mockAsesoresService.totalTrabajosAsesor.mockRejectedValue(error);

      jest.spyOn(console, 'error').mockImplementation(() => { });

      const result = await service.visualizarTotales();
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
