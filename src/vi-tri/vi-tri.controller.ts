import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, Query, UploadedFile, UseGuards, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { Response } from 'express';
import { FilterViTriDto } from './dto/filter-vi-tri.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/entities/auth.entity';
import { Role } from 'src/auth/entities/role.decorator';
import { RolesGuard } from 'src/auth/entities/roles';
import { FileInterceptorClass } from 'src/model/file.image';
import path from 'path';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags("vi-tri")
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  

  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createViTriDto: CreateViTriDto,
@UploadedFile() file: Express.Multer.File
) {
    return this.viTriService.create({...createViTriDto,hinh_anh:file.filename});
  }

  @Get()
  // @UseGuards(AuthGuard, RolesGuard) // Áp dụng cả AuthGuard và RolesGuard
  // @Role('user') // Chỉ cho phép người dùng với vai trò 'admin'

  async findAll() {
  
    return this.viTriService.findAll();
  }

  @ApiQuery({name:'pageIndex'})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'search'})
  @Get('/phan-trang-tim-kiem')
  findAllPage(@Query() query:FilterViTriDto){
    return this.viTriService.findAllPageSearch(query)
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viTriService.findOne(+id);
  }
  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Put(':id')
  update(@Param('id') id: string, 
  @Body() updateViTriDto: UpdateViTriDto,
  @UploadedFile() file: Express.Multer.File

) {
    return this.viTriService.update(+id, {...updateViTriDto,hinh_anh:file.filename});
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
 

    return this.viTriService.remove(+id);
  }
}
