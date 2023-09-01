import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookRepository } from './repository/book.repository';
import { Books } from 'src/entity/book.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookRepository)
        private readonly bookRepository: BookRepository
    ) { }

    async getBooks(filter: FilterBookDto): Promise<Books[]> {
        return await this.bookRepository.getBooks(filter)
    }

    async createBook(createBookDto: CreateBookDto): Promise<void> {
        return await this.bookRepository.createBook(createBookDto)
    }

    async getBookById(id: string) {
        const book = await this.bookRepository.findOne(id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} is not found`)
        }
        return book
    }

    async updateBook(id: string, updateBookDto): Promise<void> {
        const { title, author, category, year } = updateBookDto
        const book = await this.getBookById(id)
        book.title = title;
        book.author = author;
        book.category = category;
        book.year = year

        await book.save()
    }
    
    async deleteBook(id: string): Promise<void> {
        const result = await this.bookRepository.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`Book with id ${id} is not found`)
        }
    }
}

