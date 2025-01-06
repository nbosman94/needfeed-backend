import { ApiProperty } from "@nestjs/swagger";
import { List } from "@prisma/client";

export class UserResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;


}