import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Users } from "@prisma/client";
import { UserJoinRoomDTO } from "./dto/user-join-room.dto";


@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) { }


    async createUser(user: CreateUserDTO) {
        return await this.prismaService.users.create({
            data: {
                name: user.name,
                email: user.email,
                password:  user.password
            }
        });
    }


    async findOne(id: number): Promise<Users> {
        return await this.prismaService.users.findFirst({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<Users[]> {
        return await this.prismaService.users.findMany();
    }


    async update(id: number, user: CreateUserDTO): Promise<Users> {
        return await this.prismaService.users.update({
            where: {
                id: id
            },
            data: {
                name: user.name,
                email: user.email,
                password:  user.password
            }
        });
    }

    async delete(id: number): Promise<Users> {
        return await this.prismaService.users.delete({
            where: {
                id: id
            }
        });
    }

    async joinUserInRoom(data: UserJoinRoomDTO) {
        return await this.prismaService.users.update({
            data: {
                roomId: data.roomId
            },
            where: {
                id: data.userId
            }
        })
    }
}