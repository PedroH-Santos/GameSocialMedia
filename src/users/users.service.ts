import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private _usersRepository: UsersRepository) {}

    async create(user: CreateUserDTO): Promise<CreateUserDTO> {
        return await this._usersRepository.createUser(user);
    }

    async findOne(id: number): Promise<Users> {
        if(!id) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "ID não identificado" }, HttpStatus.BAD_REQUEST);
        }

        return await this._usersRepository.findOne(id);

    }

    async findAll(): Promise<Users[]> {
        return await this._usersRepository.findAll();
    }

    async update(id: number, user: CreateUserDTO): Promise<Users> {
        return await this._usersRepository.update(id, user);
    }

    async delete(id: number): Promise<Users> {
        return await this._usersRepository.delete(id);
    }



}
