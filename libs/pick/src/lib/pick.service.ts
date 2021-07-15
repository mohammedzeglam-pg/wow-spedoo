import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { ProductStatus } from '@prisma/client';
import { AddPickTaskDto, PaginationDto } from '@wow-spedoo/dto';
@Injectable()
export class PickService {
  constructor(private prisma: PrismaService) {}

  async getUnfinishedTasks(paginationDto:PaginationDto) {
    return this.fetchTasks(ProductStatus.UNDER_REVIEW,paginationDto);
  }

  async getFinishedTasks(paginationDto:PaginationDto) {
      return this.fetchTasks(ProductStatus.APPROVED,paginationDto);
  }

  async addTask(addPickTaskDto:AddPickTaskDto) {
    const {products,pick_boy} = addPickTaskDto;
    for(const product in products) {
      this.prisma.pick.create({
        data: {
          pick_boy:{
            connect:{
              id:pick_boy,
            },
          },
          products: {
            //TODO: fix problem
            connect: {
              id: +product
            }
          }
        },
      });
    }
  }


  private async fetchTasks(productStatus:ProductStatus,paginationDto:PaginationDto){
    return  this.prisma.product.findMany({
      where: {
        status: productStatus,
      },
      ...paginationDto
    });
  }
}
