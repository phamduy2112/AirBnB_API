import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { FileInterceptorClass } from 'src/model/file.image';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("phong")
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Post()
  create(
    @Body() createPhongDto: CreatePhongDto,
  @UploadedFile() file: Express.Multer.File
) {
    return this.phongService.create({...createPhongDto,hinh_anh:file.filename});
  }

  @Get()
  findAll() {
    return this.phongService.findAll();
  }
  @Get('lay-phong-phan-trang-tim-kiem')
  findAllPageSearch(@Query() query:any){
    return this.phongService.findAllPageSearch(query)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phongService.findOne(+id);
  }

  @Get('lay-phong-theo-vi-tri/:id')
  findLocationToRoom(@Param('id') idLocation: string){
    return this.phongService.findLocationToRoom(+idLocation)
  }

  @Get('lay-phong-theo-vi-tri-phan-trang/:id')
  findLocationToRoomPage(@Param('id') idLocation: string,@Query() query:any){
    return this.phongService.findLocationToRoomPage(query,+idLocation)
  }

  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhongDto: UpdatePhongDto,
  @UploadedFile() file: Express.Multer.File) {
    return this.phongService.update(+id, {...updatePhongDto,hinh_anh:file.filename});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phongService.remove(+id);
  }
}
