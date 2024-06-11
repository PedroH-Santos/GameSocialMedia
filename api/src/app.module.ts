import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './db/prisma.module';
import { GamesModule } from './modules/games/games.module';
import { RoomModule } from './modules/room/room.module';
import { ChatGateway } from './websocket/chat/chat.gateway';
import { ChatModule } from './websocket/chat/chat.module';


@Module({
  imports: [UsersModule, PrismaModule, GamesModule, RoomModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
  exports: []
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware)
      .forRoutes('users');
      //.forRoutes({path: 'users', method: RequestMethod.GET});
  }

}
