import { UserRelationGameStatus } from "@prisma/client";
import { IsEnum, IsNumber } from "class-validator";

export class CreateLinkGame {
    @IsEnum(UserRelationGameStatus)
    status: UserRelationGameStatus;

    @IsNumber()
    userId: number;
}