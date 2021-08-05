import { Injectable } from '@nestjs/common';
import { AddManyLocationDto } from '@wow-spedoo/nest/dto';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';

@Injectable()
export class NestRegionService {
  constructor(private readonly prisma: NestPrismaService) {}

  async addCity(name: string) {
    return this.prisma.city.create({
      data: {
        name: name,
      },
    });
  }

  async updateCityName(id, name: string) {
    return this.prisma.city.update({
      where: id,
      data: {
        name: name,
      },
    });
  }

  async getAllZones() {
    return this.prisma.city.findMany({
      select: {
        id: true,
        name: true,
        zones: {
          select: {
            id: true,
            name: true,
            price: true,
            locations: {
              select: {
                id: true,
                lat: true,
                lon: true,
              },
            },
          },
        },
      },
    });
  }

  async addZone(addZoneDto: { cityId: number; name: string; price: number }) {
    return this.prisma.zone.create({
      data: addZoneDto,
    });
  }

  async updateZone(
    id,
    updateZoneDto: { cityId?: number; name?: string; price?: number },
  ) {
    return this.prisma.zone.update({
      where: id,
      data: updateZoneDto,
    });
  }

  async addLocation(addLocationDto: {
    lat: number;
    lon: number;
    zoneId: number;
  }) {
    return this.prisma.location.create({
      data: addLocationDto,
    });
  }

  async updateLocation(
    id,
    addLocationDto: { lat: number; lon: number; zoneId: number },
  ) {
    return this.prisma.location.update({
      data: addLocationDto,
      where: id,
    });
  }

  addManyLocation(addManyLocationDto: AddManyLocationDto) {
    const { location, zoneId } = addManyLocationDto;
    const data = location.map((el) => {
      return { lat: el.lat, lon: el.lon, zoneId: zoneId };
    });
    return this.prisma.location.createMany({
      data: data,
    });
  }

  allZones() {
    return this.prisma.zone.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
