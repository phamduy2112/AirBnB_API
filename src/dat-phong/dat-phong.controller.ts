import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("dat-phong")
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @Post()
  create(@Body() createDatPhongDto: CreateDatPhongDto) {
    return this.datPhongService.create(createDatPhongDto);
  }

  @Get()
  findAll() {
    return this.datPhongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datPhongService.findOne(+id);
  }

  @Get('lay-dat-phong-theo-ma-nguoi-dung/:idUser')
  findBookRoomToUser(@Param('idUser') idUser: string) {
    return this.datPhongService.findBookRoomToUser(+idUser);
  }
  
  @Get('lay-dat-phong-theo-ma-nguoi-dung-phan-trang-tim-kiem/:idUser')
  findBookRoomToUserPageSearch(@Query() query:any,@Param('idUser') idUser: string){
    return this.datPhongService.findBookRoomToUserPageSearch(+idUser,query)
  }

  @Get('lay-dat-phong-phan-trang')
  findAllPage(@Query() query:any){
    return this.datPhongService.findAllPage(query)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDatPhongDto: UpdateDatPhongDto) {
    return this.datPhongService.update(+id, updateDatPhongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datPhongService.remove(+id);
  }
}
