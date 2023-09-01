import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Books } from 'src/entity/book.entity';
import { UUIDValidationPipe } from 'src/pipes/uuid.validation';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }
    @Get()
    async getBooks(@Query() filter: FilterBookDto): Promise<Books[]> {
        return this.booksService.getBooks(filter)
    }

    @Get('/:id')
    async getBook(@Param('id', UUIDValidationPipe) id: string): Promise<Books> {
        return this.booksService.getBookById(id)
    }

    @Post()
    async createBook(@Body() payload: CreateBookDto): Promise<void> {
        return this.booksService.createBook(payload)
    }

    @Put('/:id')
    async updateBook(
        @Param('id', UUIDValidationPipe) id: string,
        @Body() payload: updateBookDto
    ): Promise<void> {
        return this.booksService.updateBook(id, payload)
    }
        
    @Delete('/:id')
    async  deleteBook(
        @Param('id', UUIDValidationPipe) id: string
        ): Promise<void> {
        return this.booksService.deleteBook(id)
    }



}
