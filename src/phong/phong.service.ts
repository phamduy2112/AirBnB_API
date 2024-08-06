import { Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { PrismaClient } from '@prisma/client';
import { responseSend } from 'src/model/response';

@Injectable()
export class PhongService {
  prisma=new PrismaClient();
  // thêm phòng
  async create(createPhongDto: CreatePhongDto) {
    const createRoom=await this.prisma.phong.create({
      data:createPhongDto
    })
    return responseSend(createRoom,"Thành công !",200)

  }
// tìm tất cả phòng
  async findAll() {
    const findRoomAll=await this.prisma.phong.findMany();
    return responseSend(findRoomAll,"Thành công !",200)
  }
  // tìm kiểm phòng và phân trang
  async findAllPageSearch(query: any) {
    try{
      const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
      const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
      const search = query.search || '';       // Tìm kiếm
      // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
      if(!(pageIndex>0&&pageSize>0)){
        return responseSend(null, "Phải lớn hơn 0 !", 500);
  
      }
      const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
    
      const findPage= await this.prisma.phong.findMany({
        skip,
        take:pageSize,
        where: {
          ten_phong: {
            contains: search,
          },
        },
      });
      return responseSend(findPage, "Thành công !", 200);
    
    }catch(e){
      return responseSend(null, "Thất bại !", 500);
  
    }
    
  }
  // tìm phòng theo id 
  async findOne(id: number) {
    // check phòng và render phòng
    const findRoomId=await this.prisma.phong.findMany({
      where:{
        id
      }
    })
    if(!findRoomId){
      return responseSend("","Không tìm thấy phòng !",404)
    }
    return responseSend(findRoomId,"Thành công !",200)

  }
  // tìm theo vị trí của phòng

  async findLocationToRoom(idLocation:number){
    // check location
    const checkLocation=await this.prisma.viTri.findUnique({
      where:{
        id:idLocation
      }
    })
    if(!checkLocation){
      return responseSend("","Không tìm thấy vị trí !",404)

    }
    // tìm phòng theo id_viTri
    const findLocationRoom=await this.prisma.phong.findMany({
      where:{
          id_viTri:idLocation
      }
    })
    return responseSend(findLocationRoom,"Thành công !",200)
  }
  // phân trang theo vị trí của phòng

  async findLocationToRoomPage(query:any,idLocation:number){
    try{
      const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
      const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
      const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
      if(!(pageIndex>0&&pageSize>0)){
        return responseSend(null, "Phải lớn hơn 0 !", 500);
  
      }
      const findPage=await this.prisma.phong.findMany({
        skip,
        take:pageSize,
        where:{
          id_viTri:idLocation
        }
      })
      return responseSend(findPage, "Thành công !", 200);
 
    }catch(e){

    }
  }
// update phòng
  async update(id: number, updatePhongDto: UpdatePhongDto) {
    // check phòng
    const checkRoom=await this.prisma.phong.findUnique({
      where:{
        id
      }
    })
    if(!checkRoom){
      return responseSend("","Không tìm thấy phòng !",404)

    }
    //update phòng
   const updateRoom=await this.prisma.phong.update({
    where:{
      id
    },
    data:updatePhongDto
   })
   return responseSend(updateRoom,"Thành công !",200)

  }

// xóa phòng
  async remove(id: number) {
    // check phòng
    const checkRoom=await this.prisma.phong.findUnique({
      where:{
        id
      }
    })
    if(!checkRoom){
      return responseSend("","Không tìm thấy phòng !",404)

    }
    // delete phòng
    const deleteRoom= await this.prisma.phong.delete({
      where:{
        id
      }
    })
    return responseSend(deleteRoom,"Thành công !",200)

  }
}
