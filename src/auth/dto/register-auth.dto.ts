import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegisterAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    pass_word:string;

    @ApiProperty()
    @IsNotEmpty()
    phone:string;

    @ApiProperty()
    @IsNotEmpty()
    birth_day:string;

    @ApiProperty()
    @IsNotEmpty()
    gender:string;
}
