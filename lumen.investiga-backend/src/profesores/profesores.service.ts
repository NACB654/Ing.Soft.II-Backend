import { Injectable } from "@nestjs/common";

@Injectable({})
export class ProfesoresService {
    subirTrabajo() {
        return {msg: "Trabajo subido"}
    }
}