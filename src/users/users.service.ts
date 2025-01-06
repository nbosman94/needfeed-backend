import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserResponseDto } from './dto/reponse-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
        lists: {
          create: [],  // Creates an empty list
        },
      },
      include: {
        lists: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        lists: true,
      }
    })
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where: {id}})
  }

  findByEmail(email: string){
    return this.prisma.user.findUnique({where: {email}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id}})
  }

  getUserdetails(user: UserResponseDto){
    return {
      id: user.id,
      email: user.email,
      username: user.username
    }
  }
}
