import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('usuario')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Post('registro')
    registrarCuenta(@Body() user: CreateUserDto) {
        return this.usuariosService.registrarCuenta(user)
    }

    @Post('inicio')
    iniciarSesion(@Body() user: LoginDto) {
        return this.usuariosService.iniciarSesion(user)
    }

    @Get('data/:id')
    getUser(@Param("id") id: number) {
        return this.usuariosService.getUser(id);
    }
}