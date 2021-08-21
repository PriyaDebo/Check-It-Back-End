import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export const UserSchema = new mongoose.Schema<User>({
//     username: { type : String, required: true, unique: true },
//     password: { type : String, required: true }
// });

// export interface User extends mongoose.Document {
//     id: string,
//     username: string,
//     password: string,
// }

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id: string;
    @Prop()
    username: string;
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);