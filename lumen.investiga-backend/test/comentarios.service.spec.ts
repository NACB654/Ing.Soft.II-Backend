import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioService } from '../src/comentarios/comentarios.service';
import { getModelToken } from '@nestjs/sequelize';
import { Comentario } from '../src/comentarios/cometarios.model';
import { createComentario } from '../src/comentarios/dto/createcomentario.dto';

describe('ComentarioService', () => {
  let service: ComentarioService;
  let comentarioModel: typeof Comentario;

  const mockComentario = {
    id: 1,
    texto: 'Test comentario',
    trabajoId: 1,
    usuarioId: 1,
  };

  const comentarioModelMock = {
    create: jest.fn().mockResolvedValue(mockComentario),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComentarioService,
        {
          provide: getModelToken(Comentario),
          useValue: comentarioModelMock,
        },
      ],
    }).compile();

    service = module.get<ComentarioService>(ComentarioService);
    comentarioModel = module.get<typeof Comentario>(getModelToken(Comentario));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('crearComentario', () => {
    it('debe crear un comentario', async () => {
      const dto: createComentario = {
        descripcion: 'Test comentario',
        trabajoId: 1,
        usuarioId: 1,
      };

      const result = await service.crearComentario(dto);

      expect(result).toEqual(mockComentario);
      expect(comentarioModel.create).toHaveBeenCalledWith(dto);
    });

    it('debe retornar null si ocurre un error', async () => {
      const dto: createComentario = {
        descripcion: 'Test comentario',
        trabajoId: 1,
        usuarioId: 1,
      };

      jest.spyOn(comentarioModel, 'create').mockRejectedValueOnce(new Error('Error creating comentario'));

      const result = await service.crearComentario(dto);

      expect(result).toBeNull();
      expect(comentarioModel.create).toHaveBeenCalledWith(dto);
    });
  });
});

