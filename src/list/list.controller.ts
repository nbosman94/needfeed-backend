import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

@Controller('list')
export class ListController{
    constructor(private readonly listService: ListService){}

    @Post()
    async create(@Body() createListDto : CreateListDto, updateUserDto: UpdateUserDto){
        const list = await this.listService.create(createListDto, updateUserDto);
        return list;
    }

    @Get()
    findAll(@Req() req: Request){
        // const userId = req.user.id;
        return this.listService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.listService.findOne(+id);
    }

    @Delete('id')
    remove(@Param('id') id: string){
        return this.listService.remove(+id);
    }

}