import { Body, Controller, Delete, Get, Header, HttpCode, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from '@prisma/client';
import { UserJoinRoomDTO } from './dto/user-join-room.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUsers(): Promise<Users[]> {
      return await this.userService.findAll();

    }

    @Post()
    @HttpCode(201)
    @Header('Content-Type','application/json')
    async createUser(@Body(new ValidationPipe()) createUser: CreateUserDTO): Promise<CreateUserDTO> {
        return await this.userService.create(createUser);
        
    }

    

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return await this.userService.findOne(id);
    }


    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) createUser: CreateUserDTO): Promise<Users> {
       
        return await this.userService.update(id, createUser);
    }


    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return await this.userService.delete(id);
    }

    @Post('joinRoom')
    async joinUserInRoom(@Body() data: UserJoinRoomDTO) {
        const user = await this.userService.joinUserInRoom(data);
        return {
            message: "User join in the room",
            user

        }
 
    }

}
