import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { responseSend } from 'src/model/response';
import { FilterUserDto } from './dto/filter-nguoi-dung';

 
@Injectable()
export class NguoiDungService {
  prisma=new PrismaClient();

 async create(createNguoiDungDto: CreateNguoiDungDto) {
  const existingUser = await this.prisma.nguoiDung.findFirst({
    where: {
        email: createNguoiDungDto.email,
    },
});

if (existingUser) {
return responseSend('','Trùng Email',400)
}
  const hashPassword=await this.hashPassword(createNguoiDungDto.pass_word);
    const createUser= await this.prisma.nguoiDung.create({data:{...createNguoiDungDto,pass_word:hashPassword}});
    return responseSend(createUser,"Thành công !",200)
  }

  async findAll() {
    const user= await this.prisma.nguoiDung.findMany(
      {
      select:{
        name:true,
        email:true,
        phone:true,
        birth_day:true,
        gender:true,
        role:true,
      }
    }
  );
    return responseSend(user,"Thành công !",200)

  }

  async findOne(id: number) {
    const userId= await this.prisma.nguoiDung.findMany({
      where:{
        id
      },  
        select:{
          name:true,
          email:true,
          phone:true,
          birth_day:true,
          gender:true,
          role:true,
        }
      
      

    });
    return responseSend(userId,"Thành công !",200)

  }
  // phân trang , tìm kiếm

  async findAllPageSearch(query: FilterUserDto) {
    const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
    const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
    const search = query.search || '';       // Tìm kiếm
  
    const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
  
    return await this.prisma.viTri.findMany({
      skip,
      take:pageIndex,
      where: {
        ten_vi_tri: {
          contains: search,
        },
      },
    });
  }


  async update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
    const updateUSer= await this.prisma.nguoiDung.update({
      where:{
        id
      },
      data:updateNguoiDungDto
    });
    return responseSend(updateUSer,"Thành công !",200)

  }

  async remove(id: number) {
    const deteleUser= await this.prisma.viTri.delete({
      where:{
        id
      }
    });
    return responseSend(deteleUser,"Thành công !",200)

  }
  // kiểm tra password
  async checkPassword(id:number,password:{pass_word:string}){
    const checkUser=await this.prisma.nguoiDung.findFirst({
      where:{
        id
      },  
    });
    if(!checkUser){
      return responseSend('',"Không có user",400);
    }
    const checkPassword = await bcrypt.compare(password.pass_word, checkUser.pass_word);
    if(!checkPassword){
      return responseSend("","Mật khẩu không khớp",400);

    }

    return responseSend("","Check Thành công !",200)

  }
  // đổi password
  async updatePassword(id:number,password:{pass_word:string}){
    const checkUser=await this.prisma.nguoiDung.findFirst({
      where:{
        id
      },  
    });
    if(!checkUser){
      return responseSend('',"Không có user",400);
    }
    const hashPassword=await this.hashPassword(password.pass_word);

    const updateUSer= await this.prisma.nguoiDung.update({
      where:{
        id
      },
      data:{
        pass_word:hashPassword
      }
    });
    return responseSend("","Check Thành công !",200)

  }
  
  private async hashPassword(password:string){
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const hash=await bcrypt.hash(password,salt);
    return hash
  }


// tìm kiếm theo tên user 
async findSearchUser(query:any){
  const search = query.search || '';   
  const searchUser=await this.prisma.nguoiDung.findMany({
    where:{
      name:{
        contains:search
      }
    }
  })
  return responseSend(searchUser,"Thành công !",200)

}


// uploadfile
async updateFile(id: number, updateUserDto:any) {
  const UpdateUser= await this.prisma.nguoiDung.update({
    where:{
      id
    },
  data:updateUserDto
  });
  return responseSend(UpdateUser,"Thành công !",200)

}






}
