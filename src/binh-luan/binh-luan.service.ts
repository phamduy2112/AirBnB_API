import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { PrismaClient } from '@prisma/client';
import { responseSend } from 'src/model/response';

@Injectable()
export class BinhLuanService {
  prisma=new PrismaClient();

  async create(createBinhLuanDto: CreateBinhLuanDto) {
    const checkUser = await this.prisma.nguoiDung.findUnique({
      where: {
        id: createBinhLuanDto.ma_nguoi_binh_luan,
      },
    });
    if (!checkUser) {
      return responseSend('', 'Người dùng không tồn tại !', 404);
    }

    // Kiểm tra phòng
    const checkRoom = await this.prisma.phong.findUnique({
      where: {
        id: createBinhLuanDto.ma_phong,
      },
    });
    if (!checkRoom) {
      return responseSend('', 'Phòng không tồn tại !', 404);
    }
    const createComment=await this.prisma.binhLuan.create(
      {
        data: {
          ...createBinhLuanDto,
          ngay_binh_luan: new Date(), 
          
        }
      }
    )
   return responseSend(createComment,"Thêm bình luận thành công !",200)

  }

  async findAll() {
    const getCommentAll=await this.prisma.binhLuan.findMany()
    return responseSend(getCommentAll,"Thành công !",200)
  }

  // Tìm kiếm mã phòng theo ma_phong
  async findCommentRoom(ma_phong: number) {
    const getCommentAll=await this.prisma.binhLuan.findMany({
      where:{
        ma_phong
      }
    })
    if(!getCommentAll){
      return responseSend(null,"Không tìm thấy mã phòng",404);
    }
    return responseSend(getCommentAll,"Thành công !",200)
  }
  async findCommentRoomPage(id:number,query:any){
    const pageIndex=Number(query.pageIndex||1);
    const pageSize=Number(query.pageSize||2);
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
    const pageCommentRoom=await this.prisma.binhLuan.findMany({
      skip,
      take:pageIndex,
      where:{
        ma_phong:id
      }
    })
    return responseSend(pageCommentRoom,"Thành công !",200)
 
  }
  // tìm kiếm bình luận theo user
  async findCommentUser(ma_nguoi_dung:number){
    const getCommentUser=await this.prisma.binhLuan.findMany({
      where:{
        ma_nguoi_binh_luan:ma_nguoi_dung
      }
    })
    return responseSend(getCommentUser,"Thành công !",200)

  }
  async findCommentUserPage(id:number,query:any){
    const pageIndex=Number(query.pageIndex||1);
    const pageSize=Number(query.pageSize||2);
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
    const pageCommentRoom=await this.prisma.binhLuan.findMany({
      skip,
      take:pageIndex,
      where:{
        ma_nguoi_binh_luan:id
      }
    })
    return responseSend(pageCommentRoom,"Thành công !",200)
 
  }
  async update(id: number, updateBinhLuanDto: UpdateBinhLuanDto) {
    const checkComment = await this.prisma.binhLuan.findUnique({
      where: { id },
    });
  
    if (!checkComment) {
      return responseSend(null, "Comment không tồn tại", 404);
    }
    const updateComment=await this.prisma.binhLuan.update({
      where:{
        id
      },
      data: {
        ...updateBinhLuanDto,
        ngay_binh_luan: new Date(), 
        
      }
    })
    return responseSend(updateComment,"Thành công !",200)
  }

  async remove(id: number) {
      
    const checkComment = await this.prisma.binhLuan.findUnique({
      where: { id },
    });
  
    if (!checkComment) {
      return responseSend(null, "Comment không tồn tại", 404);
    }
  
    const deleteComment = await this.prisma.binhLuan.delete({
      where: { id },
    });
  
    return responseSend(deleteComment, "Thành công !", 200);
  }
}
