import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SignAuthDto } from './dto/sign-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/regester')
  regester(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }


  @Post('/login')
  login(@Body() CreateAuthDto:SignAuthDto){
    return this.authService.login(CreateAuthDto)
  }
  
}
