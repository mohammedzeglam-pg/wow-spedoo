import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { AddCityDto, AddRegionDto, AddStreetDto, IdTransformerDto } from '@wow-spedoo/dto';

@Injectable()
export class ZoneService {




  private readonly street = {
    id: true,
    name:true,
    lat:true,
    lon:true,
    price:true,
    regionId:true,
  }

  constructor(private readonly prisma:PrismaService) {
  }


  async addCity(name:string){
    return this.prisma.city.create({
      data: {
        name: name,
      }
    });
  }


  async addRegion(regionInfo:AddRegionDto){
    return this.prisma.region.create({
      data:{
        ...regionInfo
      }
    });
  }


  async addStreet(streetInfo:AddStreetDto){
    return this.prisma.street.create({
      select:{
        ...this.street
      },
      data:{
        ...streetInfo
      }
    });
  }



  async getAllCity(){
    return this.prisma.city.findMany({
      select:{
        id:true,
        name:true
      }
    });
  }


  async getRegions() {
    return this.prisma.region.findMany({
      select:{
        id:true,
        name:true
      }
    });
  }

  async getStreets(){
    return this.prisma.street.findMany({
      select:{
        ...this.street
      }
    });
  }


  async updateCity(id: IdTransformerDto, updateName: AddCityDto) {
    return this.prisma.city.update({
      where:{
        ...id,
      },
      data:{
        ...updateName
      }
    });
  }

  async updateRegion(id: IdTransformerDto, regionInfo: AddRegionDto) {
    return this.prisma.region.update({ where:{ ...id }, data:{ ...regionInfo }, });
  }

  async updateStreet(id: IdTransformerDto, streetInfo: AddStreetDto) {
    return this.prisma.street.update({where:{...id},data:{...streetInfo}});
  }
}
