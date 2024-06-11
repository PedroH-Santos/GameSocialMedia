import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';

@Module({
  controllers: [RoomController],
  providers: [RoomService,RoomRepository],
  exports: [RoomService,RoomRepository]
})
export class RoomModule {}
