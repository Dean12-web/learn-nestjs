import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Books } from 'src/entity/book.entity';
import { UUIDValidationPipe } from 'src/pipes/uuid.validation';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('books')
// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtGuard)
export class BooksController {
    constructor(private booksService: BooksService) { }
    /*@Get()
    async getBooks(@Query() filter: FilterBookDto, @Req() req): Promise<Books[]> {
        console.log(req.user)
        return this.booksService.getBooks(filter)
    } */
    @Get()
    async getBooks(@Query() filter: FilterBookDto, @GetUser() user: User): Promise<Books[]> {
        return this.booksService.getBooks(user,filter)
    }

    @Get('/:id')
    async getBook(@GetUser() user:User, @Param('id', UUIDValidationPipe) id: string): Promise<Books> {
        return this.booksService.getBookById(user,id)
    }

    @Post()
    async createBook(@GetUser() user:User, @Body() payload: CreateBookDto): Promise<void> {
        return this.booksService.createBook(user,payload)
    }

    @Put('/:id')
    async updateBook(
        @Param('id', UUIDValidationPipe) id: string,
        @Body() payload: updateBookDto,
        @GetUser() user:User
    ): Promise<void> {
        return this.booksService.updateBook(user,id, payload)
    }
        
    @Delete('/:id')
    async  deleteBook(
        @GetUser() user:User,
        @Param('id', UUIDValidationPipe) id: string
        ): Promise<void> {
        return this.booksService.deleteBook(user,id)
    }



}
