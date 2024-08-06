import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("binh-luan")
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  create(@Body() createBinhLuanDto: CreateBinhLuanDto) {
    
    return this.binhLuanService.create(createBinhLuanDto);
  }

  @Get()
  findAll() {
    return this.binhLuanService.findAll();
  }

  @Get('phong/:id')
  findCommentRoom(@Param('id') id: string) {
    return this.binhLuanService.findCommentRoom(+id);
  }
  // phân trang comment room
  @Get('phan-trang-phong-comment/:id')
  findCommentRoomPage(@Query() query:any,@Param('id') id: string){
    return this.binhLuanService.findCommentRoomPage(+id,query)
  }

  // Tìm theo bình luận của user 
  @Get('user/:id')
  firstCommentUser(@Param('id') id: string) {
    return this.binhLuanService.findCommentRoom(+id);
  }

  @Get('phan-trang-nguoi-dung-binh-luan/:id')
  findCommentUserPage(@Query() query:any,@Param('id') id: string){
    return this.binhLuanService.findCommentUserPage(+id,query)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBinhLuanDto: UpdateBinhLuanDto) {
    return this.binhLuanService.update(+id, updateBinhLuanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binhLuanService.remove(+id);
  }
}
