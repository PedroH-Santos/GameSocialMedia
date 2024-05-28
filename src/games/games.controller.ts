import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { Games, GamesListedByUser } from '@prisma/client';
import { GamesService } from './games.service';
import { CreateGameDTO } from './dto/create-games.dto';
import { CreateLinkGame } from './dto/create-link-game.dto';

@Controller('games')
export class GamesController {


    constructor(private gamesService: GamesService) {}

    @Get()
    async getGames(): Promise<Games[]> {
        return await this.gamesService.getGames();
    }

    @Post()
    async createGames(@Body(new ValidationPipe()) game: CreateGameDTO): Promise<Games> { 
        return await this.gamesService.createGame(game);

    }

    @Get('/user/:id')
    async getGamesByUserId(@Param('id', ParseIntPipe) id: number): Promise<Games[]> {
        return await this.gamesService.getGamesByUserId(id);
    }

    @Post(':id/user')
    async createLinkGameWithUserId(@Param('id', ParseIntPipe) id: number, @Body() linked: CreateLinkGame): Promise<GamesListedByUser>{
        return await this.gamesService.createLinkGameWithUserId(id, linked);
    }

}
