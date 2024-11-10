
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class VerifyDto {

    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;
}
export class RegisterDto {
    @MinLength(10, { message: 'Phone min length is $constraint1 digit', })
    @MaxLength(10, { message: 'Phone max length is $constraint1 digit', })
    phone: string;

    @IsString()
    @MinLength(8, { message: 'Password min length is $constraint1 char', })
    @MaxLength(20, { message: 'Password max length is $constraint1 char', })
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    username: string;
}
