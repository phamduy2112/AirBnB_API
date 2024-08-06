import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FilterUserDto } from './dto/filter-nguoi-dung';
import { FileInterceptorClass } from 'src/model/file.image';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("nguoi-dung")
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Post()
  create(@Body() createNguoiDungDto: CreateNguoiDungDto) {
    return this.nguoiDungService.create(createNguoiDungDto);
  }
  
  @Get()
  findAll() {
    return this.nguoiDungService.findAll();
  }
  @Get('phan-trang-tim-kiem')
  async findAllPageSearch(@Query() query:FilterUserDto){
    return this.nguoiDungService.findAllPageSearch(query)
  }


  @Get('search-user')
  async search(@Query() query: any) {
    return this.nguoiDungService.findSearchUser(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNguoiDungDto: UpdateNguoiDungDto) {
    return this.nguoiDungService.update(+id, updateNguoiDungDto);
  }

  @Get('check-password/:id')
  checkPassword(@Param('id') id:string,@Body() password:any){
    return this.nguoiDungService.checkPassword(+id, password);
  }
  @Put('update-password/:id')
  updatePassword(@Param('id') id:string,@Body() password:any){
    return this.nguoiDungService.updatePassword(+id, password);
  }

  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Put('upload-file/:id')
  updateFile(@Param('id') id:string,@Body() updateNguoiDungDto:any,  @UploadedFile() file: Express.Multer.File){
    return this.nguoiDungService.updateFile(+id, {...updateNguoiDungDto,image:file.filename});

  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nguoiDungService.remove(+id);
  }



}
