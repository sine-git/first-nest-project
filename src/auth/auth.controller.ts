import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './jwt/decorators';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('authenticate')
  authenticate(@Body() createAuthDto: AuthDto) {
    return this.authService.authenticate(createAuthDto);
  }
}
