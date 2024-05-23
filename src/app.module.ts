import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';


@Module({
  imports: [UsersModule],
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
