import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, Query } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { GuardarTrabajoDto } from "./dto/guardarTrabajo.dt";
import { ModifyUserDto } from "./dto/modify-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { GoogleDriveService } from "src/google-drive/google-drive.service";
import * as fs from 'fs';
import * as path from "path";
import { ChangePasswordDto } from "./dto/change-password.dto";

    @Controller('usuario')
    export class UsuariosController {
        constructor(private usuariosService: UsuariosService, private googleService: GoogleDriveService) {}

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

        @Put('modificar')
        modificarDatos(@Body() user: ModifyUserDto) {
            return this.usuariosService.modificarDatos(user)
        }

        @Put('password')
        cambiarPassword(@Body() datos: ChangePasswordDto) {
            return this.usuariosService.cambiarPassword(datos);
        }

        @Post('foto')
        @UseInterceptors(FileInterceptor('file'))
        async subirFoto(@UploadedFile() file: Express.Multer.File, @Body("id") id: number) {
            if (!file) {
                console.log("No hay archivo subido")
            }

            const filePath = path.resolve(file.path)
            const url = await this.googleService.uploadToDrive(filePath, file.originalname, file.mimetype)

            if (url) {
                fs.unlinkSync(file.path)
            }

            return this.usuariosService.subirFoto(url, id);
        }

        @Get('eliminar')
        eliminarTrabajo(@Query('userId') userId: number, @Query('trabajoId') trabajoId: number) {
            return this.usuariosService.eliminarTrabajo(userId, trabajoId);
        }
    }