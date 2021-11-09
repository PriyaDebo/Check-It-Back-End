import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    // @Prop()
    // _id: string;
    @Prop({unique: true})
    username: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

