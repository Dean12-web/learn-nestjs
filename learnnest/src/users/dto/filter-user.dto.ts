import { IsOptional } from "class-validator";

export class fillterUserDto{
    @IsOptional()
    name: string;

    @IsOptional()
    email: string
}