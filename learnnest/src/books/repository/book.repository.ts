import { Books } from 'src/entity/book.entity';
import { EntityRepository, Repository } from 'typeorm'
import { FilterBookDto } from '../dto/filter-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';

@EntityRepository(Books)
export class BookRepository extends Repository<Books>{
    async getBooks(user: User,filter: FilterBookDto): Promise<Books[]> {
        const { title, author, category, min_year, max_year} = filter
        const query = this.createQueryBuilder('book').where('book.userId = :userId', {userId: user.id});
        
        if(title){
            // query.andWhere(`lower(book.title) LIKE :title`,{title:title.toLowerCase()})
            query.andWhere(`lower(book.title) LIKE :title`,
                {title: `%${title.toLowerCase()}%`})
        }
        if(author){
            query.andWhere(`lower(book.author) LIKE :author`,
                {author:`%${author.toLowerCase()}%`})
        }
        if(category){
            query.andWhere(`lower(book.category) LIKE :category`,
                {category:`%${category.toLowerCase()}%`})
        }
        if(min_year){
            query.andWhere(`lower(book.year) >= :min_year`,
                {title:title.toLowerCase()})
        }

        if(max_year){
            query.andWhere(`lower(book.year) <= :min_year`,
                {title:title.toLowerCase()})
        }

        return await query.getMany()
    }

    async createBook(user:User,createBookDto: CreateBookDto): Promise<void>{
        const { title, author, category, year } = createBookDto;
        const book = this.create()
        book.title = title;
        book.author = author;
        book.category = category;
        book.year = year;
        book.user = user;

        try {
            await book.save()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}