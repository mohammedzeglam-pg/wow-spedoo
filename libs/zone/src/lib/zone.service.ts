import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

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


  async addRegion(regionInfo){
    try {
      const {cityId,name} = regionInfo;
      return this.prisma.region.create({
        data:{
          name:name,
          cityId:cityId
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }


  async addStreet(streetInfo){
    try{
      const {name,regionId,latitude,longitude,price} = streetInfo;
      return this.prisma.street.create({
        select:{
          ...this.street
        },
        data:{
          name:name,
          latitude:latitude,
          longitude:longitude,
          price:price,
          regionId:regionId
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

  async getPrice(){
    
  }


}
