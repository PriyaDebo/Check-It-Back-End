import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { User } from "src/Database/Users/users.model";
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from "./jwt.strategy";


@Injectable()
export class AuthService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>, private jwtStrategy: JwtStrategy) {}

    async findUser(username: string): Promise<Query<User, User, {}, User>> {
        return await this.userModel.findOne({username});
    }

    async signup(username: string, password: string) {
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

    async login(username: string, password: string) {
        const user = await this.findUser(username);

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }
        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtStrategy.createJWT(user.id);
        return jwt;
    }
}

