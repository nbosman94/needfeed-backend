import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { UpdateListDto } from "./dto/update-list.dto";

@Injectable()
export class ListService {

    constructor(private prisma: PrismaService){}

    
    async create(createListDto: CreateListDto, userId: number) {
        return this.prisma.list.create({
          data: {
            author: {
              connect: { id: userId }, 
            },
            listItems: {
              create: createListDto.listItems.map((item) => ({
                content: item.content,
                quantity: item.quantity,
              })), 
            },
          },
        });

    }

    update(id: number, updateListDto: UpdateListDto){
      
    }

    findAll(){
        return this.prisma.list.findMany();
    }

    findOne(id: number){
        return this.prisma.list.findUnique({
          where: {id},
          include: {
            author: true
          }
        });
    }

    remove(id: number){
        return this.prisma.list.delete({where: {id}});
    }


}