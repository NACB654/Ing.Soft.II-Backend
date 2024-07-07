// usuario.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/usuarios.model';
import { LoginDto } from 'src/usuarios/dto/login.dto';
import { ModifyUserDto } from 'src/usuarios/dto/modify-user.dto'; 

const mockRepository = {
  findOne: jest.fn(),
  set: jest.fn(),
  save: jest.fn()
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

describe('modificarDatos', () => {
    it('debe modificar los datos del usuario si se encuentra', async () => {
      const modifyUserDto: ModifyUserDto = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        codigo: 1234,
      };

      const user = {
        set: jest.fn(),
        save: jest.fn(),
      };

      jest.spyOn(usuarioModel, 'findOne').mockResolvedValue(user as any);

      const result = await service.modificarDatos(modifyUserDto);

      expect(usuarioModel.findOne).toHaveBeenCalledWith({ where: { id: modifyUserDto.id } });
      expect(user.set).toHaveBeenCalledWith(modifyUserDto);
      expect(user.save).toHaveBeenCalled();
      expect(result).toEqual(user);
    });

    it('debe retornar null si el usuario no se encuentra', async () => {
      const modifyUserDto: ModifyUserDto = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        codigo: 1234,
      };

      jest.spyOn(usuarioModel, 'findOne').mockResolvedValue(null);

      const result = await service.modificarDatos(modifyUserDto);

      expect(usuarioModel.findOne).toHaveBeenCalledWith({ where: { id: modifyUserDto.id } });
      expect(result).toBeNull();
    });

    it('debe manejar los errores adecuadamente y retornar null', async () => {
      const modifyUserDto: ModifyUserDto = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        codigo: 1234,
      };

      jest.spyOn(usuarioModel, 'findOne').mockRejectedValue(new Error('Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = await service.modificarDatos(modifyUserDto);

      expect(usuarioModel.findOne).toHaveBeenCalledWith({ where: { id: modifyUserDto.id } });
      expect(consoleSpy).toHaveBeenCalledWith(new Error('Error'));
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });

    it('debe llamar a los métodos set y save del modelo si se encuentra el usuario', async () => {
      const modifyUserDto: ModifyUserDto = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        codigo: 1234,
      };

      const user = {
        set: jest.fn(),
        save: jest.fn(),
      };

      jest.spyOn(usuarioModel, 'findOne').mockResolvedValue(user as any);

      await service.modificarDatos(modifyUserDto);

      expect(user.set).toHaveBeenCalledWith(modifyUserDto);
      expect(user.save).toHaveBeenCalled();
    });

    it('debe retornar el usuario modificado', async () => {
      const modifyUserDto: ModifyUserDto = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        codigo: 1234,
      };

      const user = {
        set: jest.fn(),
        save: jest.fn(),
      };

      jest.spyOn(usuarioModel, 'findOne').mockResolvedValue(user as any);

      const result = await service.modificarDatos(modifyUserDto);

      expect(result).toEqual(user);
    });
  });
});