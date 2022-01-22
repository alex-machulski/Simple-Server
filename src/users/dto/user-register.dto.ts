import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: 'Wrong email'})
    email: string;

    @IsString({message: 'Password was not entered'})
    password: string;

    @IsString({message: 'Name was not entered'})
    name: string;
}