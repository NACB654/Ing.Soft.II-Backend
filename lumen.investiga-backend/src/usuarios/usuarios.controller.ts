    import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
    import { UsuariosService } from "./usuarios.service";
    import { CreateUserDto } from "./dto/create-user.dto";
    import { LoginDto } from "./dto/login.dto";
    import { GuardarTrabajoDto } from "./dto/guardarTrabajo.dt";

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

        @Post('guardar')
        guardarTrabajos(@Body() trabajo: GuardarTrabajoDto) {
            return this.usuariosService.guardarTrabajo(trabajo);
        }

        @Get('eliminar')
        eliminarTrabajo(@Query('userId') userId: number, @Query('trabajoId') trabajoId: number) {
            return this.usuariosService.eliminarTrabajo(userId, trabajoId);
        }
    }