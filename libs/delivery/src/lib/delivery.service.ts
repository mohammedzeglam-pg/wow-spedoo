import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { Delivery, DeliveryStatus, Product } from '@prisma/client';
import { Message } from '@wow-spedoo/api-interfaces';

@Injectable()
export class DeliveryService {

  constructor(private prisma:PrismaService) {}

  //TODO: better naming convention for function

  // I know long name.
  async getUnDeliveredOrder(take=10, skip=0):Promise<Product[]|Message>{
    try {
      return await this.prisma.product.findMany(
        {
          where: {
            deliveryId: null,
          },
          take: take,
          skip: skip * take,
        }
      );
    }catch(err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }
  // bad practise babe any
  async addDeliveryTask(pickInfo:any):Promise<Delivery|Message>{
    const {total_location, total_pieces, status, pick_boyId: delivery_boyId, products} = pickInfo;
    try {
      return await this.prisma.delivery.create(
        {
          data: {
            total_location: total_location,
            total_pieces: total_pieces,
            status: status,
            delivery_boyId: delivery_boyId,
            products: products,
          }
        },
      );
    }catch(err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }

  //TODO: common error can be shown to find proper way to handle all scenario
  async getPickStatus(PickId:number):Promise<any|Message>{
    try{

      const status = await this.prisma.pick.findUnique({
        select:{
          status: true
        },
        where:
          { id: PickId, },
      });
      return status;
    }catch(err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }

  //TODO:maybe delete them but jit is here for now
   getUnderPickTasks(take:number, skip:number){
    this.getTasksFromStatus(take,skip,DeliveryStatus.UNDER_DELIVERING);
  }
  async getCompletedPickTasks(take:number, skip:number){
    return this.getTasksFromStatus(take,skip,DeliveryStatus.COMPLETED);
  }
  getCanceledPickTasks(take:number, skip:number){
    return this.getTasksFromStatus(take,skip,DeliveryStatus.CANCELED);
  }
  async getPickTasks(take=10, skip=0){
    try{
      return await  this.prisma.pick.findMany({
        take: take,
        skip: skip * take,
      });
    }catch(err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }

   private async getTasksFromStatus(take=10,skip=0,status:DeliveryStatus){
    try{
      return await this.prisma.delivery.findMany({
        where:{
          status:{
            equals: status,
          }
        },
        take: take,
        skip: skip * take,
      });
    }catch(err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }

  //TODO: add it
  // async UpdatePickTask()
}
