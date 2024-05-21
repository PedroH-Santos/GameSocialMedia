import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getUsers(): any {
        return this.userService.findAll();

    }

    @Post()
    @HttpCode(201)
    @Header('Content-Type','application/json')
    createUser(@Body() createUser: CreateUserDTO): any {
        this.userService.create(createUser);
        return "Objeto criado";
    }


    @Get(':id')
    getUser(): any {

    }


    @Put(':id')
    updateUser(@Param() id: number, @Body() createUser: CreateUserDTO): any {
        console.log(createUser);
        return createUser;
    }


    @Delete(':id')
    deleteUser(): any {

    }
}
