import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { AddCityDto, AddRegionDto, AddStreetDto, IdTransformerDto } from '@wow-spedoo/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';

@Controller('zone')
export class ZoneController {
  constructor(private zoneService: ZoneService) {}




  //city
  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('city/add')
  async addCity(@Body() addCity:AddCityDto){
    const {name} = addCity;
    return await this.zoneService.addCity(name);
  }

  @Roles(Role.ADMIN,Role.MANAGER,Role.PARTNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('city')
  async getCities(){
    return await this.zoneService.getCities();
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch('city/:id')
  async updateCity(@Param() id:IdTransformerDto,@Body() updateName:AddCityDto){
    return await this.zoneService.updateCity(id,updateName);
  }


  //region

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('region/add')
  async addRegion(@Body() addRegion:AddRegionDto){
    return await this.zoneService.addRegion(addRegion);
  }

  @Roles(Role.ADMIN,Role.MANAGER,Role.PARTNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('region')
  async getRegions(){
    return await this.zoneService.getCities();
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch('region/:id')
  async updateRegion(@Param() id: IdTransformerDto,@Body() regionInfo:AddRegionDto){
   return  await this.zoneService.updateRegion(id,regionInfo);
  }


  //street

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('street/add')
  async addStreet(@Body() addStreet:AddStreetDto){
    return await this.zoneService.addStreet(addStreet);
  }

  @Roles(Role.ADMIN,Role.MANAGER,Role.PARTNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('street')
  async getStreets(){
    return await this.zoneService.getStreets();
  }

  @Roles(Role.ADMIN,Role.MANAGER,Role.PARTNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch('street/:id')
  async updateStreet(@Param() id:IdTransformerDto,@Body() streetInfo:AddStreetDto){
    return await this.zoneService.updateStreet(id,streetInfo);
  }

}
