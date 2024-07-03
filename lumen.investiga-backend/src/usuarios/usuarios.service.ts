import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Usuario } from "./usuarios.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { Profesor } from "src/profesores/profesores.model";
import { GuardarTrabajoDto } from "./dto/guardarTrabajo.dt";
import { TrabajoUsuario } from "src/trabajos-usuarios/trabajos-usuarios.model";
import { ModifyUserDto } from "./dto/modify-user.dto";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario) private userModel: typeof Usuario,
    @InjectModel(Profesor) private profesorModel: typeof Profesor,
    @InjectModel(TrabajoUsuario) private trabajoUsuarioModel: typeof TrabajoUsuario,
  ) {}

  async registrarCuenta(user: CreateUserDto) {
    try {
      if (!user.isTeacher) {
        return await this.userModel.create(user as any);
      } else {
        const response = await this.userModel.create(user as any);
        const response2 = await this.profesorModel.create(user as any);

        return [response, response2];
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async iniciarSesion(user: LoginDto) {
    try {
      return await this.userModel.findOne({
        where: {
          email: user.email,
          password: user.password,
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getUser(id: number) {
    try {
      return await this.userModel.findOne({where: {id}})
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  async guardarTrabajo(trabajo: GuardarTrabajoDto) {
    try {
      return await this.trabajoUsuarioModel.create({
        usuarioId: trabajo.userId,
        trabajoId: trabajo.trabajoId,
      })
    } catch (err) {
      console.error(err)
      return null
    }
  }

  async modificarDatos(datos: ModifyUserDto){
    try {
      const result = await this.userModel.findOne({where: {id: datos.id}})

      if (result) {
        result.set(datos)
        result.save()
      }

      return result
    } catch (err) {
      console.error(err)
      return null
    }
  }
}