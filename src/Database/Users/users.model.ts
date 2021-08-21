import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema<User>({
    username: { type : String, required: true, unique: true },
    password: { type : String, required: true }
});

export interface User extends mongoose.Document {
    id: string,
    username: string,
    password: string,
}