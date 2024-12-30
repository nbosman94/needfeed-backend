import { ApiProperty } from "@nestjs/swagger";
import { List } from "@prisma/client";

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string

    @ApiProperty()
    list: List[]
}
