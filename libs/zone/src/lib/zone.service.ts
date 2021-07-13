import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { AddCityDto, AddRegionDto, AddStreetDto, IdTransformerDto } from '@wow-spedoo/dto';

@Injectable()
export class ZoneService {




  private readonly street = {
    id: true,
    name:true,
    latitude:true,
    longitude:true,
    price:true,
    regionId:true,
  }

  constructor(private readonly prisma:PrismaService) {
  }


  async addCity(name:string){
    try {
      return this.prisma.city.create({
        data: {
          name: name,
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }


  async addRegion(regionInfo:AddRegionDto){
    try {
      return this.prisma.region.create({
        data:{
          ...regionInfo
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }


  async addStreet(streetInfo:AddStreetDto){
    try{
      return this.prisma.street.create({
        select:{
          ...this.street
        },
        data:{
          ...streetInfo
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }



  async getCities(){
    try{
      return this.prisma.city.findMany({
        select:{
          id:true,
          name:true
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }


  async getRegions() {
    try{
      return this.prisma.region.findMany({
        select:{
          id:true,
          name:true
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }

  async getStreets(){
    try{
      return this.prisma.street.findMany({
        select:{
          ...this.street
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }


  async updateCity(id: IdTransformerDto, updateName: AddCityDto) {
    try{
      return this.prisma.city.update({
        where:{
          ...id,
        },
        data:{
          ...updateName
        }
      });
    }catch(err){
      Logger.warn(err)
    }
  }

  async updateRegion(id: IdTransformerDto, regionInfo: AddRegionDto) {
    try{
      return this.prisma.region.update({ where:{ ...id }, data:{ ...regionInfo }, });
    }catch (err){
      Logger.warn(err);
    }
  }

  async updateStreet(id: IdTransformerDto, streetInfo: AddStreetDto) {
    try{
      return this.prisma.street.update({where:{...id},data:{...streetInfo}});
    }catch(err){
      Logger.log(err);
    }
  }
}
