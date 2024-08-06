import { Injectable } from '@nestjs/common';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { PrismaClient } from '@prisma/client';
import { FilterViTriDto } from './dto/filter-vi-tri.dto';
import { responseSend } from 'src/model/response';
import path from 'path';
import { FileInterceptorClass } from 'src/model/file.image';

@Injectable()
export class ViTriService {
  prisma=new PrismaClient();

  async create(createViTriDto: CreateViTriDto) {
    try{
 const createLocation= await this.prisma.viTri.create({data:createViTriDto});
    return responseSend(createLocation, "Thành công !", 200);
    }catch(e){
      return responseSend(null, "Thất bại !", 500);

    }
   

  }

 async findAll() {
  try{
    const findLocationAll= await this.prisma.viTri.findMany();
    return responseSend(findLocationAll, "Thành công !", 200);
  }catch(e){
    return responseSend(null, "Thất bại !", 500);

  }


    
  }
// phân trang tìm kiếm
async findAllPageSearch(query: FilterViTriDto) {
  try{
    const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
    const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
    const search = query.search || '';       // Tìm kiếm
    // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
    if(!(pageIndex>0&&pageSize>0)){
      return responseSend(null, "Phải lớn hơn 0 !", 500);

    }
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
  
    const findPage= await this.prisma.viTri.findMany({
      skip,
      take:pageSize,
      where: {
        ten_vi_tri: {
          contains: search,
        },
      },
    });
    return responseSend(findPage, "Thành công !", 200);
  
  }catch(e){
    return responseSend(null, "Thất bại !", 500);

  }
  
}
 async findOne(id: number) {
  try{
    const findLocationOne= await this.prisma.viTri.findUnique({
      where:{
        id
      }
    });
    if(!findLocationOne){
      return responseSend(null, "Vị trí không tồn tại", 404);

    }
    return responseSend(findLocationOne, "Thành công !", 200);

  }catch(e){
    return responseSend(null, "Thất bại !", 500);

  }

  }

  async update(id: number, updateViTriDto: UpdateViTriDto) {
    try{
      const checkLocation= await this.prisma.viTri.findUnique({
        where:{
          id
        }
      });
      if(!checkLocation){
        return responseSend(null, "Vị trí không tồn tại", 404);
  
      }
      const updateLocation= await this.prisma.viTri.update({
        where:{
          id
        },
        data:updateViTriDto
      });
      return responseSend(updateLocation, "Thành công !", 200);


    }catch(e){
      return responseSend(null, "Thất bại !", 500);

    }
    
  }

  async remove(id: number) {
    try{
      const checkLocation=await this.prisma.viTri.findUnique({
        where:{
          id
        }
      })
      if (!checkLocation) {
        return responseSend(null, "Comment không tồn tại", 404);
      }
  
      const deleteLocation= await this.prisma.viTri.delete({
        where:{
          id
        }
      });
      return responseSend(deleteLocation, "Thành công !", 200);
  
    }catch(e){
      return responseSend(null, "Thất bại !", 500);

    }
    
  }
}
