import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db/prisma.service";
import { CreateGameDTO } from "./dto/create-games.dto";
import { Games, GamesListedByUser } from "@prisma/client";
import { CreateLinkGame } from "./dto/create-link-game.dto";


@Injectable()
export class GamesRepository {

    constructor(private prismaService: PrismaService) {}

    async getGames(): Promise<Games[]> {
        return await this.prismaService.games.findMany();
    }

    async createGame(game: CreateGameDTO): Promise<Games> {
        return await this.prismaService.games.create({
            data: game
        });
    }
    
    async getGamesByUserId(userId: number): Promise<Games[]> {
        /* FAZENDO COM QUERY PADRÃO */ 
        
        const result: Games[] = await this.prismaService.$queryRaw`SELECT * FROM "Games" g
        INNER JOIN "GamesListedByUser" gl ON gl."gameId" = g."id"
        WHERE gl."userId" = ${userId}`;
        return result;
        
    

        /* FAZENDO COM O PRISMA */
        /*
        return await this.prismaService.games.findMany({
            where: {
                users:  {
                    every: {
                        id : userId,
                    }
                }
            }
        })*/
    }

    async createLinkGameWithUserId(id: number, linked: CreateLinkGame): Promise<GamesListedByUser> {
        return await this.prismaService.gamesListedByUser.create({
            data: {
                gameId: id,
                userId: linked.userId,
                status: linked.status
            }
        });
    }
    
}