import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { AddLocationDto, AddZoneDto, IdTransformerDto } from '@wow-spedoo/dto';

@Injectable()
export class ZoneService {





  constructor(private readonly prisma:PrismaService) { }


  async addCity(name:string){
    return this.prisma.city.create({
      data: {
        name: name,
      }
    });
  }

  async updateCityName({id}:IdTransformerDto,name:string){
    return this.prisma.city.update(
      {
        where:{
          id:id,
        },
        data:{
          name:name
        }
      }
    );
  }

  async getAllZones(){
    return this.prisma.city.findMany({
      select:{
        name:true,
        zones: {
          select: {
            name: true,
            locations: {
              select: {
                lat: true,
                lon: true,
              }
            }
          },
        },
      }
    });
  }

  async addZone(addZoneDto:AddZoneDto){
    return this.prisma.zone.create({
      data:addZoneDto
    });
  }


  async updateZone({id}:IdTransformerDto,addZoneDto:AddZoneDto){
    return this.prisma.zone.update({
      where:{id:id},
      data:addZoneDto,
    })
  }


  async addLocation(addLocationDto:AddLocationDto){
    return this.prisma.location.create({
      data:addLocationDto
    });
  }

  async updateLocation({id}:IdTransformerDto,addLocationDto:AddLocationDto){
    return this.prisma.location.update({
      data:addLocationDto,
      where:{id:id},
    });
  }

}
