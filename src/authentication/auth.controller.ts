import { Controller, Body, Put, Res, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Put('signup')
    async addUser(@Body() body: UserDto) {
      await this.authService.signup(body);
      return { message: "User Created" };
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      const userDto = new UserDto({...req.user});
      return await this.authService.createJwt(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async getUser(@Request() req) {
      const userDto = new UserDto({username: req.user});
      return req.user;
    }
}
  