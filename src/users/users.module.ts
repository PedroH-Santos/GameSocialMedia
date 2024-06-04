import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { RoomModule } from "src/room/room.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    imports:[RoomModule],
    exports: [UsersService]
})

export class UsersModule {}