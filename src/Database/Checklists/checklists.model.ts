import { Document, Mongoose, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ListItem } from './lists.model';
import { User } from '../Users/users.model';

export type CheckListDocument = CheckList & Document;

@Schema()
export class CheckList {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: String;
    @Prop()
    name: String;
    @Prop()
    items: ListItem[];
}

export const ListSchema = SchemaFactory.createForClass(CheckList);

