import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { Message } from '@wow-spedoo/api-interfaces';
import {Pick,Product,PickStatus} from '@prisma/client';
@Injectable()
export class PickService {

  constructor(private prisma:PrismaService) {}

  // I know long name .
  async getUnPickedOrder(take=10, skip=0):Promise<Product[]|Message>{
    try {
      return await this.prisma.product.findMany(
        {
          where: {
            pickId: null,
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
  async addPickJob(pickInfo:any):Promise<Pick|Message>{
    const {total_location, total_pieces, status, pick_boyId, products} = pickInfo;
    try {
      return await this.prisma.pick.create(
        {
          data: {
            total_location: total_location,
            total_pieces: total_pieces,
            status: status,
            pick_boyId: pick_boyId,
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
  async getUnderPickTasks(take=10, skip=0):Promise<Pick[]|Message>{
    try{
      return await this.prisma.pick.findMany({
        where:{
          status:{
            equals:PickStatus.UNDER_PICKING
          }
        },
        take: take,
        skip: skip * take,
      });
    }catch (err){
      Logger.log(err);
      return {message:'Unhandled problem'};
    }
  }
  async getCompletedPickTasks(take=10, skip=0){
    try{
      return await this.prisma.pick.findMany({
        where:{
          status:{
            equals: PickStatus.COMPLETED,
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
  async getCanceledPickTasks(take=10, skip=0){
    try{
      return await this.prisma.pick.findMany({
        where:{
          status:{
            equals: PickStatus.CANCELED,
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


  //TODO: add it
  // async UpdatePickTask()
}
