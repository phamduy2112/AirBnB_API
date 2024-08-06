import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/auth/entities/roles';
import { AuthGuard } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // hoặc ConfigModule.forRoot({ /* options */ }) nếu có cấu hình
    ViTriModule,
  ],
  controllers: [ViTriController],
  providers: [ViTriService,AuthGuard, RolesGuard],
})
export class ViTriModule {}
