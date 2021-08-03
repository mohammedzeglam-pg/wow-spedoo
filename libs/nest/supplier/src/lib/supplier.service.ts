import { Injectable } from '@nestjs/common';
import { NestPrismaService } from '@wow-spedoo/nest/prisma';

type Point = {
  lon: number;
  lat: number;
};
@Injectable()
export class NestSupplierService {
  private readonly response = {
    name: true,
    phone: true,
    lat: true,
    lon: true,
  };
  constructor(private readonly prisma: NestPrismaService) {}

  async addSupplier(
    id: number,
    orderData: { name: string; phone: string; lat: number; lon: number },
  ) {
    const zoneId = await this.getZone({
      lon: orderData.lon,
      lat: orderData.lat,
    });
    return this.prisma.supplier.create({
      select: this.response,
      data: {
        ...orderData,
        zone: {
          connect: {
            id: zoneId,
          },
        },
        partner: { connect: { id: id } },
      },
    });
  }
  async updateSupplier(
    { id }: { id: number },
    orderData: { name: string; phone: string; lat: number; lon: number },
  ) {
    return this.prisma.supplier.update({
      data: {
        ...orderData,
      },
      where: {
        id: id,
      },
    });
  }

  async getSupplier(partnerId: number, { id }: { id: number }) {
    return this.prisma.supplier.findFirst({
      select: this.response,
      where: {
        id: id,
        AND: {
          partner: {
            is: {
              id: partnerId,
            },
          },
        },
      },
    });
  }

  async getManySupplier({ id }: { id: number }, { take = 10, skip = 0 }) {
    return this.prisma.supplier.findMany({
      where: {
        partner: {
          is: {
            id: id,
          },
        },
      },
      take: take,
      skip: skip * take,
    });
  }

  async getZone(point: { lon: number; lat: number }) {
    const polygons = await this.getPolygons();
    for (const poly of polygons) {
      const id = poly.id;
      const locations = poly.locations;
      const check = this.pointInPolygon({ p: point, points: locations });
      if (check) {
        return id;
      }
    }
    return null;
  }

  async getPolygons() {
    return this.prisma.zone.findMany({
      select: {
        id: true,
        locations: {
          select: {
            lat: true,
            lon: true,
          },
        },
      },
    });
  }

  // Winding number algorithm
  // read about this topic https://en.wikipedia.org/wiki/Point_in_polygon
  private static cross(x: Point, y: Point, z: Point): number {
    return (
      (y.lon - x.lon) * (z.lat - x.lat) - (z.lon - x.lon) * (y.lat - x.lat)
    );
  }
  private pointInPolygon({
    p,
    points,
  }: {
    p: Point;
    points: Array<Point>;
  }): boolean {
    let wn = 0; // winding number

    points.forEach((a, i) => {
      const b = points[(i + 1) % points.length];
      if (a.lat <= p.lat) {
        if (b.lat > p.lat && NestSupplierService.cross(a, b, p) > 0) {
          wn += 1;
        }
      } else if (b.lat <= p.lat && NestSupplierService.cross(a, b, p) < 0) {
        wn -= 1;
      }
    });

    return wn !== 0;
  }
}
