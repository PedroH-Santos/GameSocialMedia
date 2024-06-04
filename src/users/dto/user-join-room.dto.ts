import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UserJoinRoomDTO {
    @IsString()
    codeRoom: string;
    @IsNumber()
    userId: number;

    @Exclude()

    roomId: number;
}