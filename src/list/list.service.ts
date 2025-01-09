import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

@Injectable()
export class ListService {

    constructor(private prisma: PrismaService){}

    
    async create(createListDto: CreateListDto, userDto: UpdateUserDto) {
        return this.prisma.list.create({
          data: {
            author: {
              connect: { id: userDto.id }, 
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

    findAll(){
        return this.prisma.list.findMany();
    }

    findOne(id: number){
        return this.prisma.list.findUnique({where: {id}});
    }

    remove(id: number){
        return this.prisma.list.delete({where: {id}});
    }


}