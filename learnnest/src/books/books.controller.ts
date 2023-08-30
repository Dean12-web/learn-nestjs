import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { query } from 'express';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }
    /* private booksService:BooksService;
        constructor(booksService:BooksService){
        this.booksService = booksService
    }*/
    @Get()
    getBooks(@Query() filter:FilterBookDto) {
        return this.booksService.getBooks(filter)
    }

    @Get('/:id')
    getBook(@Param('id') id: string) {
        return this.booksService.getBook(id)
    }
    /*
    Parameter Scope Pipes 
    @Post()
    createBook(@Body('year', ParseIntPipe) year:number) {
        console.log({year})
        // return this.booksService.createBook(payload)
    }
    */

    @Post()
    createBook(@Body() payload:CreateBookDto) {
        return this.booksService.createBook(payload)
    }

    @Put('/:id')
    // @UsePipes(ValidationPipe) Handler Scope Pipes 
    updateBook(
        @Param('id') id: string,
        @Body() payload:updateBookDto) {
        return this.booksService.updateBook(id, payload)
    }

    @Delete('/:id')
    deleteBook(
        @Param('id') id: string
        ) {
        return this.booksService.deleteBook(id)
    }


}
