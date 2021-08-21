import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenicationModule } from './authentication/auth.module';

@Module({
  imports: [AuthenicationModule, MongooseModule.forRoot('mongodb://localhost:27017/CheckIt')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
