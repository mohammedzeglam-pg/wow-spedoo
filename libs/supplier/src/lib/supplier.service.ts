import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { AddSupplierDto, PaginationDto } from '@wow-spedoo/dto';

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

  async addSupplier(orderData:AddSupplierDto,token:string){
    // const {name,phone,lat,lon,streetId} = orderData;
    const {streetId, ...data} = orderData;
    return this.prisma.supplier.create({
      select:{...this.supplierInfo},
      data:{
        ...data,
        street:{connect:{id:streetId},},
        partner:{ connect:{ token:token, },
        },
      }
    });
  }

  async getSupplier(id:number,token:string){
    return this.prisma.supplier.findFirst({
      where:{
        id:id,
        AND:{
          partner:{
            is:{
              token:token,
            },
          }
        }
      },
      select:{
        ...this.supplierInfo
      },
    });
  }

  async getManySupplier(pagination:PaginationDto,token:string){
    return this.prisma.supplier.findMany({
      where:{
        partner:{
          is:{
            token:token,
          }
        }
      },
      select:{
        ...this.supplierInfo
      },
        ...pagination
    });
  }

}
