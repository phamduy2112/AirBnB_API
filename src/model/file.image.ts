import { Injectable } from '@nestjs/common';
import { FileInterceptor, FileInterceptor as MulterFileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import fs from 'fs';

@Injectable()
export class FileInterceptorClass {
  static getFileInterceptor() {
    return FileInterceptor("hinhAnh",{storage:diskStorage({
        destination:process.cwd()+"/public/img",
        
        
        filename:(req,file,callback)=>callback(null,new Date().getTime()+"_"+file.originalname)
      })})
  }
  static deleteFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Lỗi khi xóa file:', err);
      } else {
        console.log('Đã xóa file thành công:', filePath);
      }
    });
  }
}