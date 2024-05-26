import { Controller, Get } from "@nestjs/common";
import { SubareaService } from "./subarea.service";

@Controller('subarea')
export class SubareaController {
  constructor(private subareaService: SubareaService) { }
  
  @Get("info")
  getSubareas() {
    return this.subareaService.getSubareas();
  }
}