import { BadRequestException, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { User } from "src/Database/Users/users.model";
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from "./jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { LocalAuthGuard } from "./local-auth.guard";
import { SignupUserDto } from "./dto/signup-user.dto";


@Injectable()
export class AuthService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>, private jwtStrategy: JwtStrategy, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.findUser(username);
        
        if(user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async findUser(username: string): Promise<Query<User, User, {}, User>> {
        return await this.userModel.findOne({username});
    }

    async signup(signupUserdto: SignupUserDto) {
        var username = signupUserdto.username;
        var password = signupUserdto.password;
        if (await this.findUser(username)) {
            throw new BadRequestException('username exists');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            username,
            password: hashedpassword
        });
        const user = await newUser.save();
        delete user.password;
        return user;
    }

    async login(user: User) {
        const payload = user;
        return this.jwtService.sign({payload})
    }
}

