import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { CreateOrderDto } from '@wow-spedoo/dto';

// class Point{
//   lat:number;
//   lon:number;
// }

type Point = {
  lon: number;
  lat: number;
}
@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService) {}

  async addOrder({payment_method,products,...order}:CreateOrderDto,token:string) {
    const point:Point = order;
    const delivery_price = await this.getPricing(point);
    return this.prisma.order.create({
      select:{id:true,delivery_price:true},
      data: {
        ...order,
        delivery_price,
        partner:{connect:{
            token:token,
          },},
        payment:{
          connect:{
            ...payment_method
          },
        },
        products:{
          createMany:{
            data:[...products]
          },
        },
      },
    });
  }

  async getOrderDetails(orderId:number, token:string){
    return this.prisma.order.findFirst({
      select:{
        order_id: true,
        products: {
          select:{
            name:true,
            status:true,
          }
        }
      },
      where: {
        id:orderId,
        AND:{
          partner:{
            is: {
              token:token
            },
          },
        }
      },
    });
  }



  async getPricing(point:{lon:number,lat:number}){
  // async getPricing(){
    const polygons = await this.getPolygons();
    for(const poly of polygons){
      console.log(poly);
      const price = poly.price;
      const locations = poly.locations;
      const check = this.pointInPolygon({p:point,points:locations});
      if(check){
        return price;
      }
    }
    return null;
  }





  async getPolygons(){
    return this.prisma.zone.findMany({
      select: {
        price: true,
        locations: {
          select: {
            lat: true,
            lon: true,
          }
        }
      }
    });
  }


  // this logic just implementation using a algo that find the point is inside polygon or not will not work with line

  // type Point = {
  //   lon: number;
  //   lat: number;
  // }

  private static cross(x: Point, y: Point, z: Point): number {
    return (y.lon - x.lon) * (z.lat - x.lat) - (z.lon - x.lon) * (y.lat - x.lat);
  }
  private pointInPolygon({ p, points }: { p: Point; points: Array<Point>; }): boolean {
  // private pointInPolygon( p: Point, points: Array<Point>): boolean {
    let wn = 0; // winding number

    points.forEach((a, i) => {
      const b = points[(i + 1) % points.length];
      if (a.lat <= p.lat) {
        if (b.lat > p.lat && OrderService.cross(a, b, p) > 0) {
          wn += 1;
        }
      } else if (b.lat <= p.lat && OrderService.cross(a, b, p) < 0) {
        wn -= 1;
      }
    });

    return wn !== 0;
  }



}
