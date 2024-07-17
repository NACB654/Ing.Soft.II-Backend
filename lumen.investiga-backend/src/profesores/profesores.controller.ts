import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfesoresService } from "./profesores.service";
import { CreateTrabajo } from "src/trabajos/dto/create-trabajo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import * as path from "path";
import { GoogleDriveService } from "src/google-drive/google-drive.service";

@Controller('profesor')
export class ProfesoresController {
    constructor(private profesorService: ProfesoresService, private googleService: GoogleDriveService) {}
    
    @Post('subir')
    subirTrabajo(@Body() trabajo: CreateTrabajo) {
        return this.profesorService.subirTrabajo(trabajo)
    }

    @Post("pdf")
    @UseInterceptors(FileInterceptor('file'))
    async subirPdf(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            console.log("No hay archivo subido")
        }

        console.log(file)
        let filePath;

        if (file.mimetype == 'application/pdf') {
            filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);
            fs.writeFileSync(filePath, file.buffer);
        }
        else {
            filePath = path.resolve(file.path)
        }
        
        const url = await this.googleService.uploadToDrive(filePath, file.originalname, file.mimetype)

        if (url) {
            fs.unlinkSync(filePath)
            return { url };
        }
        else {
            return null;
        }
    }
}