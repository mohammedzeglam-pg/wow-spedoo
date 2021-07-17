import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}


  async addSupplier(id:number,orderData: {name:string,phone:string,lat:number,lon:number} ) {
    return this.prisma.supplier.create({
      data: {
        ...orderData,
        partner: { connect: { id:id } },
      },
    });
  }
  async updateSupplier({id}:{id:number},orderData: {name:string,phone:string,lat:number,lon:number} ) {
    return this.prisma.supplier.update({
      data: {
        ...orderData,
      },
      where:{
        id:id
      }
    });
  }

  async getSupplier( partnerId: number,{id}:{id: number}) {
    return this.prisma.supplier.findFirst({
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

  async getManySupplier({id}:{id: number} ,{take=10,skip=0} ) {
    return this.prisma.supplier.findMany({
      where: {
        partner: {
          is: {
            id: id,
          },
        },
      },
      take:take,
      skip:skip*take
    });
  }
}
