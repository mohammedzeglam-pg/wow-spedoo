import { Controller,Body ,Get, Patch, Post } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import {Partner} from '@prisma/client';
import { UpdatePartnerDto } from './dto/update-partner.dto';
@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}



  //TODO:passport-local-apikey
  //TODO: generate api-key
  @Post('create')
  async createPartner(@Body() partner:CreatePartnerDto):Promise<Partner|void>{
    return await this.partnerService.createPartner(partner);
  }


  //TODO:stop here
  @Patch('update')
  async updatePatrner(updatePartner:UpdatePartnerDto):Promise<Partner|void>{
    return await this.partnerService.updatePartner(updatePartner);
  }

  @Get()
  getAllPartnerOrder(){

  }
  @Get()
  getAllPartnerSupplier(){

  }


}
