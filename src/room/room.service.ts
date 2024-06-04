import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './room.repository';
import { randomBytes } from 'crypto';
@Injectable()
export class RoomService {

  constructor(private roomRepository: RoomRepository) {}


  create(createRoomDto: CreateRoomDto) {
    createRoomDto.code = randomBytes(4).toString('hex');
  
    return this.roomRepository.create(createRoomDto);
  }

  findAll() {
    return this.roomRepository.findAll();
  }

 async findOne(id: number) {
    const room =  await this.roomRepository.findOne(id);
   this.validateRoomExist(room);
   return room;
  }
  async findByCode(code: string) {
    const room = await this.roomRepository.findByCode(code);
    this.validateRoomExist(room);
    return room;
  }


 async update(id: number, updateRoomDto: UpdateRoomDto) {
    const currentRoom = await this.findOne(id);
   this.validateRoomExist(currentRoom);
    return this.roomRepository.update(id,updateRoomDto);
  }

  async remove(id: number) {
    const currentRoom = await this.findOne(id);
    this.validateRoomExist(currentRoom);
    return this.roomRepository.delete(id);
  }


  validateRoomExist(result: any){
    if (!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Room does not exist'
      }, HttpStatus.BAD_REQUEST);
    }
  }





}
