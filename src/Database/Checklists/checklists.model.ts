import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ListItem } from './lists.model';

export type ListDocument = List & Document;

@Schema()
export class List {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop()
    items: ListItem[];
}

export const ListSchema = SchemaFactory.createForClass(List);

