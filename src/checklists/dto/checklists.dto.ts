import { ListItem } from "src/checklists/dto/listitems.dto";

export class ChecklistDto {

    id?: string;

    userId: string;

    name: string;

    items: ListItem[];
}