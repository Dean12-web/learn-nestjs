import {IsInt,IsNotEmpty} from 'class-validator'
import {Type} from 'class-transformer'
export class updateBookDto {
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    year: string;  
}