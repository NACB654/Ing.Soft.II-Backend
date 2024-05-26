import { Controller, Get } from "@nestjs/common";
import { ODSservice } from "./ods.service";

@Controller('ods')
export class ODScontroller {
  constructor(private odsService: ODSservice) { }
  
  @Get('info')
  getODS() {
    return this.odsService.getODS();
  }
}