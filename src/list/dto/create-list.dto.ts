import { UserEntity } from "src/users/entities/user.entity";

export class CreateListDto {
    listItems: CreateListItemDto[];
}

export class CreateListItemDto{
    content: string;
    quantity: number;
}