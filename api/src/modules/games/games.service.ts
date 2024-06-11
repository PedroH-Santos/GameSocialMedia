import { Injectable } from '@nestjs/common';
import { Games, GamesListedByUser } from '@prisma/client';
import { GamesRepository } from './games.repository';
import { CreateGameDTO } from './dto/create-games.dto';
import { CreateLinkGame } from './dto/create-link-game.dto';

@Injectable()
export class GamesService {

    constructor(private gamesRepository: GamesRepository) {}

    async getGames(): Promise<Games[]> {
        return await this.gamesRepository.getGames();
    }

    async createGame(game: CreateGameDTO): Promise<Games> {
        return await this.gamesRepository.createGame(game);
    }


    async getGamesByUserId(userId: number): Promise<Games[]> {
        return await this.gamesRepository.getGamesByUserId(userId);
    }


    async createLinkGameWithUserId(id: number, linked: CreateLinkGame): Promise<GamesListedByUser> {
        return await this.gamesRepository.createLinkGameWithUserId(id, linked);
    }




}
