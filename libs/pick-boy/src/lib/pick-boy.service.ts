import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import {ProductStatus} from '@prisma/client';
@Injectable()
export class PickBoyService {
  constructor(private readonly prisma: PrismaService) {}


  //get id from token
  async getUnfinshedTasks(take=10,skip=0){
    return this.fetchProducts(ProductStatus.UNDER_PICKING,take,skip);
  }



  async getFinshedTasks(take=10,skip=0){
    return this.fetchProducts(ProductStatus.UNDER_DELIVERING,take,skip);
  }

  //TODO: control status from controller
  async updateTaskStatus(status:ProductStatus,productId:number){
    try{
      return this.prisma.product.update(
        {
          data:{
            status:status,
            times:{
              create:{

              },
            },
          },
          where:{
            id:productId
          }
        }
      );
    }catch(err){
      Logger.log(err);
    }
  }



  private async fetchProducts(status:ProductStatus,take=10,skip=0){
    try{
      return await this.prisma.pickBoy.findMany({
        where:{
          pick:{
            every:{
              products:{
                every:{
                  status:status
                }
              }
            }
          }
        },
        take:take,
        skip:take*skip,
      });
    }
    catch (err){
      Logger.log(err);
    }
  }
}

