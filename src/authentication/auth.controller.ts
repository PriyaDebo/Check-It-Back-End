import { Controller, Body, Put, Res, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from "express";
import { LocalAuthGuard } from './local-auth.guard';
import { SignupUserDto } from './dto/signup-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
  
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Put('signup')
    async addUser(@Body() body: SignupUserDto): Promise<any> {
      await this.authService.signup(body);
      return { message: "User Created" };
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req,
        @Res({passthrough: true}) response: Response,   
    )
    {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async getUser(@Request() req) {
      return req.user;
    }
}
  