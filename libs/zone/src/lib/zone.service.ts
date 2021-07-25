import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class ZoneService {
  constructor(private readonly prisma: PrismaService) {}

  async addCity(name: string) {
    return this.prisma.city.create({
      data: {
        name: name,
      },
    });
  }

  async updateCityName(id , name: string) {
    return this.prisma.city.update({
      where:id ,
      data: {
        name: name,
      },
    });
  }

  async getAllZones() {
    return this.prisma.city.findMany({
      select: {
        name: true,
        zones: {
          select: {
            name: true,
            locations: {
              select: {
                lat: true,
                lon: true,
              },
            },
          },
        },
      },
    });
  }

  async addZone(addZoneDto: {cityId:number,name:string,price:number}) {
    return this.prisma.zone.create({
      data: addZoneDto,
    });
  }

  async updateZone(id, updateZoneDto: {cityId?:number,name?:string,price?:number}) {
    return this.prisma.zone.update({
      where: id,
      data: updateZoneDto,
    });
  }

  async addLocation(addLocationDto: {lat:number,lon:number,zoneId:number}) {
    return this.prisma.location.create({
      data: addLocationDto,
    });
  }

  async updateLocation( id, addLocationDto:{lat:number,lon:number,zoneId:number} ) {
    return this.prisma.location.update({
      data: addLocationDto,
      where: id,
    });
  }
}
