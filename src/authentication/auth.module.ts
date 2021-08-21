import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Database/Users/users.model';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), JwtModule.register({secret: "Secret"})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthenicationModule {}