import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { PrismaModule } from './db/prisma.module';
import { GamesModule } from './games/games.module';
import { RoomModule } from './room/room.module';


@Module({
  imports: [UsersModule, PrismaModule, GamesModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware)
      .forRoutes('users');
      //.forRoutes({path: 'users', method: RequestMethod.GET});
  }

}
