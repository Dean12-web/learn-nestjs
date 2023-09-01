import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { fillterUserDto } from "../dto/filter-user.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async getUsers(filter: fillterUserDto): Promise<User[]> {
        const { name, email } = filter
        const query = this.createQueryBuilder('user');
    
        if(name){
            query.andWhere(`lower(user.name) LIKE :name`,{name: `%${name.toLowerCase()}%`})
        }

        if(email){
            query.andWhere(`lower(user.email) LIKE :email`,{email : `%${email.toLowerCase()}%`})
        }

        return await query.getMany()
    }
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { name, email, password } = createUserDto

        const user = this.create()
        user.name = name
        user.email = email
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(password, user.salt)

        try {
            await user.save()
        } catch (error) {
            if(error.code = '23505'){
                throw new ConflictException(`Email ${email} already used`)
            }else{
                throw new InternalServerErrorException(error)
            }

        }
    }
}