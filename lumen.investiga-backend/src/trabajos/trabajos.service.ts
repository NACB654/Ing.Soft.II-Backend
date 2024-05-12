import { Injectable } from "@nestjs/common";

@Injectable({})
export class TrabajosInvestigacionService {
    mostrarResultados() {
        return {msg: "Mostrando resultados.."}
    }

    abrirTrabajo() {
        return {msg: "Abriendo trabajo"}
    }
}