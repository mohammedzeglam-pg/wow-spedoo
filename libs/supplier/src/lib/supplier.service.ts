import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { PaginationDto } from '@wow-spedoo/dto';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma:PrismaService) { }


  private readonly supplierInfo = {
    name:true,
    phone:true,
    partnerId: true,
    street:{
      select:{
        id:true,
        name:true,
      },
    },
  }

  async addSupplier(orderData,partnerId:number){
    const {name,phone,latitude,longitude,streetId} = orderData;
    try{
      return this.prisma.supplier.create({
        select:{...this.supplierInfo},
        data:{
          name:name,
          phone:phone,
          latitude:latitude,
          longitude:longitude,
          streetId:streetId,
          partnerId:partnerId
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }

  async getSupplier(partnerId:number,id:number){
    try{
      return this.prisma.supplier.findFirst({
        where:{
          id:id,
          AND:{
            partnerId:partnerId
          }
        },
        select:{
          ...this.supplierInfo
        },
      });
    }catch(err){
      Logger.warn(err);
    }
  }

  async getSuppliers(partnerId:number,pagination:PaginationDto){
    const {take,skip} = pagination;
    try{
      return this.prisma.supplier.findMany({
        where:{
          partnerId:partnerId,
        },
        select:{
          ...this.supplierInfo
        }
      });
    }catch(err){
      Logger.warn(err);
    }
  }

}
