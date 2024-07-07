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
const mockAsesoresService = {};
const mockODSService = {};
const mockPeriodosService = {};
const mockSubareaService = {};
const mockCursosService = {};

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
});
