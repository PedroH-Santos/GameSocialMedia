import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from '@prisma/client';
import { UserJoinRoomDTO } from './dto/user-join-room.dto';
import { RoomService } from 'src/modules/room/room.service';

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository, private roomService: RoomService) {}

    async create(user: CreateUserDTO): Promise<CreateUserDTO> {
        return await this.usersRepository.createUser(user);
    }

    async findOne(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne(id);
        this.validateUserExist(user);
        return await this.usersRepository.findOne(id);

    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.findAll();
    }

    async update(id: number, user: CreateUserDTO): Promise<Users> {
        const currentUser = await this.usersRepository.findOne(id);
        this.validateUserExist(currentUser);
        return await this.usersRepository.update(id, user);
    }

    async delete(id: number): Promise<Users> {
        const currentUser = await this.usersRepository.findOne(id);
        this.validateUserExist(currentUser);
        return await this.usersRepository.delete(id);
    }

    async joinUserInRoom(data: UserJoinRoomDTO) {
        const currentUser = await this.usersRepository.findOne(data.userId);
        this.validateUserExist(currentUser);
        const findRoom = await this.roomService.findByCode(data.codeRoom);
        data.roomId = findRoom.id;
        return await this.usersRepository.joinUserInRoom(data);
    }


    validateUserExist(result: any) {
        if (!result) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User does not exist'
            }, HttpStatus.BAD_REQUEST);
        }
    }
    
}
