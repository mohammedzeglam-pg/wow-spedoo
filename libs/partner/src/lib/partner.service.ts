import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import { Partner, Supplier } from '@prisma/client';
import { Message } from '@wow-spedoo/api-interfaces';

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}
  // get value from object in controller maybe new for you that's why wrote this long comment
  async createPartner({ userId }): Promise<Partner | void> {
    return await this.prisma.partner.create({
      data: {
        userId: userId,
      },
    });
  }

  async updatePartner(updatedData): Promise<Partner | void> {
    // return await this.prisma.partner.update();
  }

  //TODO: hey man you know indexes start from 0 not from 1 just if you an lua programming i love lua and one data structure(table)
  // if have any trouble to understand this json like just hit ctrl+left mouse if you use vim just press gd
  getAllPartnerOrder(take = 10, skip = 0) {
    return this.prisma.partner.findMany({
      include: {
        orders: {
          select: {
            order_id: true,
            total_pieces: true,
            total_price: true,
            delivery_price: true,
            payment_method: true,
            updated_at: true,
            products: {
              select: {
                name: true,
                total_pieces: true,
                dimensions: true,
                weight: true,
              },
            },
          },
        },
      },
      //TODO: add how you want search
      where: {},

      take: take,
      skip: skip * take,
    });
  }

  //TODO: maybe new type to get out of c/p hell
  async getAllPartnerSupplier(
    take = 10,
    skip = 0,
  ): Promise<Partner[] | Message> {
    try {
      return await this.prisma.partner.findMany({
        include: {
          suppliers: {
            select: {
              name: true,
              phone: true,
              latitude: true,
              longitude: true,
            },
          },
        },
        //TODO: add how you want search
        where: {
          id: 1,
        },
        take: take,
        skip: skip * take,
      });
    } catch (err) {
      Logger.log(err);
      return { message: 'error' };
    }
  }

  // man if you think you see that before yeh maybe flutter or graphql sorry this prisma
  // if you have any problem with code just use goto-definition in your ide if you do not use nano

  //TODO:know the type that return
  //   async addNewSupplier(supplier):Promise<Supplier|Message>{
  async addNewSupplier(supplier) {
    const {
      name,
      phone,
      latitude,
      longitude,
    }: { name: string; phone: number; latitude: string; longitude: string } =
      supplier;
    try {
      return await this.prisma.partner.update({
        data: {
          suppliers: {
            create: {
              name: name,
              phone: phone,
              latitude: latitude,
              longitude: longitude,
            },
          },
        },
        //TODO:ApiKey do not forget to change it to unique
        where: {
          id: 1,
        },
        select: {
          suppliers: {
            select: {
              name: true,
              phone: true,
              latitude: true,
              longitude: true,
            },
          },
        },
      });
    } catch (err) {
      Logger.log(err);
      return { message: 'hello' };
    }
  }
}
