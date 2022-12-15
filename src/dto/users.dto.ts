import { IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}