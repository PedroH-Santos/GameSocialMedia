import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { Room } from "@prisma/client";
import { UpdateRoomDto } from "./dto/update-room.dto";



@Injectable()
export class RoomRepository {

    constructor(private prismaService: PrismaService) { }


    async create(room: CreateRoomDto) {
        return await this.prismaService.room.create({
            data: {
                name: room.name,
                code: room.code,
                creatorId: room.creatorId,
                gameId: room.gameId,
            }
        });
    }


    async findOne(id: number): Promise<Room> {
        return await this.prismaService.room.findFirst({
            where: {
                id: id
            },
            include: {
                creator: true,
                game: true,
                participants: true
            }
        });
    }
    async findByCode(code: string): Promise<Room> {
        return await this.prismaService.room.findFirst({
            where: {
                code: code
            }
        });
    }

    async findAll(): Promise<Room[]> {
        return await this.prismaService.room.findMany({
            include: {
                creator: true,
                game: true,
            }
        });
    }


    async update(id: number, room: UpdateRoomDto): Promise<Room> {
        return await this.prismaService.room.update({
            where: {
                id: id
            },
            data: {
                name: room.name,
                creatorId: room.creatorId,
                gameId: room.gameId,
            }
        });
    }

    async delete(id: number): Promise<Room> {
        return await this.prismaService.room.delete({
            where: {
                id: id
            }
        });
    }



}