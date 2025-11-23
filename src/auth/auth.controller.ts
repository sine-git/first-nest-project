import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './jwt/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('authenticate')
  authenticate(@Body() createAuthDto: AuthDto) {
    return this.authService.authenticate(createAuthDto);
  }
}
