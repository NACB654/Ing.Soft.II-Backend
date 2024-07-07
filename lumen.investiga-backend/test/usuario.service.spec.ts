// usuario.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/usuarios.model';
import { LoginDto } from 'src/usuarios/dto/login.dto';

const mockRepository = {
  findOne: jest.fn(),
};

describe('UsuarioService', () => {
  let service: UsuariosService;
  let usuarioModel: typeof Usuario;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario),
          useValue: mockRepository,
        },
        {
          provide: 'UsuarioRepository',
          useValue: mockRepository,
        },
        {
          provide: 'ProfesorRepository',
          useValue: mockRepository,
        },
        {
          provide: 'TrabajoUsuarioRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    usuarioModel = module.get<typeof Usuario>(getModelToken(Usuario));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe retornar un usuario si las credenciales son correctas', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const user = { id: 1, email: 'test@example.com', password: 'password' };

    jest.spyOn(usuarioModel, 'findOne').mockResolvedValue(user as any);

    const result = await service.iniciarSesion(loginDto);
    expect(result).toEqual(user);
  });

  it('debe retornar null si ocurre un error', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password',
    };

    jest.spyOn(usuarioModel, 'findOne').mockRejectedValue(new Error('Error'));

    const result = await service.iniciarSesion(loginDto);
    expect(result).toBeNull();
  });
});
