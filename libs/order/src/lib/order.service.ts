import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { CreateOrderDto } from '@wow-spedoo/dto';
import {Transaction} from '@prisma/client';
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
    const orderData = await this.prisma.order.create({
      select:{
        id:true,
        delivery_price:true,
        partner:{
          select:{
            profit:true,
            id:true
          }
        },
        payment:{select:{
            is_take:true,
          },
        },
      },
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
    await this.financials(orderData, order, delivery_price);
    return {
      id:orderData.id,
      delivery_price: orderData.delivery_price,
      total_price:order.total_price,
      amount:order.total_price+delivery_price
    }
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
      const price = poly.price;
      const locations = poly.locations;
      const check = this.pointInPolygon({p:point,points:locations});
      if(check){
        return price;
      }
    }
    return null;
  }


  private async financials(orderData: {id:number;payment:{is_take:boolean};partner:{profit:number,id:number}}, order: Pick<CreateOrderDto, 'order_id' | 'total_pieces' | 'recipient' | 'total_price' | 'lat' | 'lon'>, delivery_price) {
    const { payment } = orderData;
    const { partner } = orderData;
    // Debt on company
    const transaction = payment.is_take ? Transaction.DUES : Transaction.DEBT;
    const { profit } = partner;
    if (payment.is_take) {
      const amount = profit == 0.0 ? order.total_price : order.total_price +((profit*delivery_price)/100);
      await this.prisma.partner.update({
        where: {
          id: partner.id,
        },
        data: {
          financials: {
            create: {
              transaction: transaction,
              amount: amount,
            },
          },
        },
      });
    } else {
      const amount = profit == 0.0? delivery_price:(profit*delivery_price)/100;
      await this.prisma.partner.update({
        where: {
          id: partner.id
        },
        data: {
          financials: {
            create: {
              transaction: transaction,
              amount: amount,
            }
          }
        }
      });
    }
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


  // Winding number algorithm
  // read about this topic https://en.wikipedia.org/wiki/Point_in_polygon
  // source https://gist.github.com/mohammedzeglam-pg/4e0e7c4548c5a78c1a9d02d0153a66da
  private static cross(x: Point, y: Point, z: Point): number {
    return (y.lon - x.lon) * (z.lat - x.lat) - (z.lon - x.lon) * (y.lat - x.lat);
  }
  private pointInPolygon({ p, points }: { p: Point; points: Array<Point>; }): boolean {
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
