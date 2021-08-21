import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy {
    constructor(private jwtService: JwtService) {}

    async createJWT (id: string) {
        const jwt = await this.jwtService.signAsync({id}, {expiresIn: 60})
        return jwt;
    }

    async verifyUser (cookie: string) {
        const data = await this.jwtService.verifyAsync(cookie);
        return data;
    }
}