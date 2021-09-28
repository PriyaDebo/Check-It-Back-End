import { ListItem } from "src/Database/Checklists/lists.model";

export class ChecklistDto {

    id: string;

    name: string;

    items: ListItem[];
}