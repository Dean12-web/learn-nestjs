import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { fillterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
        ){}
    
    async getUsers(filter: fillterUserDto):Promise<User[]>{
        return this.userRepository.getUsers(filter)
    }
    async createUser(createUserDto: CreateUserDto): Promise<void>{
        return await this.userRepository.createUser(createUserDto)
    }
}
