import { ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateViTriDto {
    @ApiProperty()
    id:0;

    @ApiProperty()
    @IsNotEmpty()
    ten_vi_tri:string;

    @ApiProperty()
    @IsNotEmpty()
    tinh_thanh:string;

    @ApiProperty()
    @IsNotEmpty()
    quoc_gia:string;

   
    @ApiProperty({ type: 'string', format: 'binary' })
    hinh_anh:any;

}
