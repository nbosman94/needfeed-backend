import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";

@Module({
    imports: [PrismaModule],
    exports: [ListService],
    controllers: [ListController],
    providers: [ListService]

})
export class ListModule {}