import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignAuthDto{

    @ApiProperty()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    pass_word:string;

}