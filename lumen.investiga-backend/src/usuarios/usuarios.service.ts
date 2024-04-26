import { Injectable } from "@nestjs/common";

@Injectable({})
export class UsuariosService {
    registrarCuenta() {
        return {msg: "Cuenta registrada"}
    }

    iniciarSesion() {
        return {msg: "Sesion iniciada"}
    }

    realizarBusqueda() {
        return {msg: "Buscando..."}
    }
}