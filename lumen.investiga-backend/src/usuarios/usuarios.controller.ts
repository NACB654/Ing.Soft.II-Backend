import { Controller, Get, Post } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";

@Controller('usuario')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Post('registro')
    registrarCuenta() {
        return this.usuariosService.registrarCuenta()
    }

    @Post('inicio')
    iniciarSesion() {
        return this.usuariosService.iniciarSesion()
    }

    @Post('busqueda')
    realizarBusqueda() {
        return this.usuariosService.realizarBusqueda()
    }
}