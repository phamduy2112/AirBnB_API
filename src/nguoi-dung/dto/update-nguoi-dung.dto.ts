import { PartialType } from '@nestjs/mapped-types';
import { CreateNguoiDungDto } from './create-nguoi-dung.dto';

export class UpdateNguoiDungDto  {
    name:string;
    phone:string;
    birth_day:string
    gender:string;
    role:string


}
