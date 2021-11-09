import { BadRequestException, Injectable, NotFoundException, Options, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { User, UserDocument } from "src/Database/Users/users.model";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "./dto/user.dto";


@Injectable()
export class AuthService {

    constructor(@InjectModel('Users') private readonly userModel: Model<UserDocument>, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<UserDocument> {
        const user = await this.findUser(username);
        
        if(user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async findUser(username: string): Promise<UserDocument> {
        return await this.userModel.findOne({username});
    }

    async signup(signupUserdto: UserDto) {
        var username = signupUserdto.username;
        var password = signupUserdto.password;
        if (await this.findUser(username)) {
            throw new BadRequestException('username exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            username,
            password: hashedPassword
        });
        const user = await newUser.save();
        delete user.password;
        return user;
    }

    async createJwt(user: UserDto) {
        return await this.jwtService.signAsync({user});
    }

    async deleteUser(user: UserDto) {
        var username = user.username;
        const result = await this.userModel.deleteOne({username})
    }
}

