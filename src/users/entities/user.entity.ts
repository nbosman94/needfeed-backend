import { ApiProperty, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { List, User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    lists: List[]
}
