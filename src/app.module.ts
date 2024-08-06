import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { AuthModule } from './auth/auth.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { PhongModule } from './phong/phong.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';

@Module({
  imports: [ViTriModule, AuthModule, NguoiDungModule, BinhLuanModule, PhongModule, DatPhongModule],
  controllers: [AppController],
  
  providers: [AppService],
})
export class AppModule {}
