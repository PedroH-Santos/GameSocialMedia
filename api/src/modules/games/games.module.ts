import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { GamesService } from './games.service';

@Module({
    controllers: [GamesController],
    providers: [GamesService, GamesRepository],
    imports: [],
    exports: [GamesService]
})
export class GamesModule {
    
}
