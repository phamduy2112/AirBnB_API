import { Injectable } from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { PrismaClient } from '@prisma/client';
import { responseSend } from 'src/model/response';

@Injectable()
export class DatPhongService {
  prisma=new PrismaClient();

  async create(createDatPhongDto: CreateDatPhongDto) {
    try{
      const checkRoom=await this.prisma.phong.findUnique({
        where:{
          id:createDatPhongDto.ma_phong
        }
      })
      if(!checkRoom){
        return responseSend(null, "Mã phòng không tồn tại", 404);
      }
      const checkUser=await this.prisma.nguoiDung.findUnique({
        where:{
          id:createDatPhongDto.ma_nguoi_dat
        }
      })
      if(!checkUser){
        return responseSend(null, "Mã người dùng không tồn tại", 404);

      }
      const createBookRoom=await this.prisma.datPhong.create({
        data:{...createDatPhongDto,ngay_den:new Date(),ngay_di:new Date()}
      })
      return responseSend(createBookRoom, "Thành công !", 200);

    }catch(e){
      console.log(e);
      
      return responseSend(null, "Thất bại !", 500);

    }
  }

  async findAll() {
    try{
  const findBookRoomAll=await this.prisma.datPhong.findMany();
    return responseSend(findBookRoomAll, "Thành công !", 200);
    }catch(e){
      return responseSend("", "Thất bại !", 500);

    }
  
  }
// phân trang 
async findAllPage(query: any) {
  try{
    const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
    const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
    // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
    if(!(pageIndex>0&&pageSize>0)){
      return responseSend(null, "Phải lớn hơn 0 !", 500);

    }
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
  
    const findPage= await this.prisma.datPhong.findMany({
      skip,
      take:pageSize,
      
      
    });
    return responseSend(findPage, "Thành công !", 200);
  
  }catch(e){
    // console.log();
    
    return responseSend(e, "Thất bại !", 500);

  }
}
// làm về  trang chi tiết đặt phòng ở admin
async findOne(id: number) {
    try{
      const checkBookRoom=await this.prisma.datPhong.findUnique({
        where:{
          id
        },
        include: {
          Phong: true, 
        }
      })
      if(!checkBookRoom){
        return responseSend(null, "Mã đặt phòng không tồn tại", 404);

      }
      return responseSend(checkBookRoom, "Thành công !", 200);

    }catch(e){
      return responseSend("", "Thất bại !", 500);

    }
  }
//  dat phong theo ma nguoi dung và render ra phòng đã đặt
async findBookRoomToUser(idUser:number){
  try{
    const checkUser=await this.prisma.nguoiDung.findUnique({
      where:{
        id:idUser
      },
      
    })
    if(!checkUser){
      return responseSend(null, "User không tồn tại", 404);

    }
    const findBookRoomToUSer=await this.prisma.datPhong.findMany({
      where:{
        ma_nguoi_dat:idUser
      },
      include: {
        Phong: true, 
      }
    })
    return responseSend(findBookRoomToUSer,"Thành công !",200);

  }catch(e){
    return responseSend(null, "Thất bại !", 500);

  }
}
//  phân trang đặt phòng theo mã người dùng
async findBookRoomToUserPageSearch(idUser:number,query: any) {
  try{
    const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
    const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
    const search = query.search || '';       // Tìm kiếm

    // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
    if(!(pageIndex>0&&pageSize>0)){
      return responseSend(null, "Phải lớn hơn 0 !", 500);

    }
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
  
    const findPage= await this.prisma.datPhong.findMany({
      skip,
      take:pageSize,
      where:{
        ma_nguoi_dat:idUser,
        Phong:{
          ten_phong:{
            contains:search,
          }
        }
      },
      include: {
        Phong: true, 
      }
     
    });
    return responseSend(findPage, "Thành công !", 200);
  
  }catch(e){
    return responseSend(null, "Thất bại !", 500);

  }
}
  async update(id: number, updateDatPhongDto: UpdateDatPhongDto) {
    try{
      const checkRoom=await this.prisma.phong.findUnique({
        where:{
          id:updateDatPhongDto.ma_phong
        }
      })
      if(!checkRoom){
        return responseSend(null, "Mã phòng không tồn tại", 404);
      }
      const checkUser=await this.prisma.nguoiDung.findUnique({
        where:{
          id:updateDatPhongDto.ma_nguoi_dat
        }
      })
      if(!checkUser){
        return responseSend(null, "Mã người dùng không tồn tại", 404);

      }
      const checkBookRoom=await this.prisma.datPhong.findUnique({
        where:{
          id
        }
      })
      if(!checkBookRoom){
        return responseSend(null, "Mã đặt phòng không tồn tại", 404);

      }
      const updateBookRoom=await this.prisma.datPhong.update({
        where:{
          id
        },
        data:updateDatPhongDto
      })
      return responseSend(updateBookRoom, "Thành công !", 200);

    }catch(e){
      return responseSend(null, "Thất bại !", 500);

    }
  }

  async remove(id: number) {
    try{
      const checkBookRoom=await this.prisma.datPhong.findUnique({
        where:{
          id
        }
      })
      if(!checkBookRoom){
        return responseSend(null, "Mã đặt phòng không tồn tại", 404);

      }
      const deleteBookRoom=await this.prisma.datPhong.delete({
        where:{
          id
        }
      })
      return responseSend(deleteBookRoom, "Thành công !", 200);

    }catch(e){
      return responseSend("", "Thất bại !", 500);

    }
  }
}
