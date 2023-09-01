import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { fillterUserDto } from './dto/filter-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Get()
    async getUsers(@Query() filter:fillterUserDto) : Promise<User[]>{
        return this.usersService.getUsers(filter)
    }    
    @Post()
    async createUser(@Body() payload:CreateUserDto): Promise<void>{
        return this.usersService.createUser(payload)
    }

}
