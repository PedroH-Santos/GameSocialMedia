import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    name: string;
    @IsNumber()
    creatorId: number;
    @IsNumber()
    gameId: number;
    @Exclude()
    code: string;
}
