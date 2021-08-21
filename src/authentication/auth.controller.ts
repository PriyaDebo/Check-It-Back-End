import { Controller, Body, Put, Res, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from "express";
  
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Put('signup')
    async addUser(
      @Body('username') userName: string,
      @Body('password') userPassword: string,
    ) 
    {
      await this.authService.signup(
        userName,
        userPassword,
      );
      return { message: "User Created" };
    }

    @Post('login')
    async login(
        @Body('username') userName: string,
        @Body('password') userPassword: string,
        @Res({passthrough: true}) response: Response,   
    )
    {
        const jwtToken = await this.authService.login(
            userName,
            userPassword,
        )
        response.cookie('jwt', jwtToken, {httpOnly: true});
        return {
            message: "Login Successful"
        };
    }
}
  