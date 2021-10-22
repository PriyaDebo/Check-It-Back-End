import { ListItem } from "src/checklists/dto/listitems.dto";
import { CheckListDocument } from "src/Database/Checklists/checklists.model";

export class ChecklistDto {

    constructor(checkList: CheckListDocument) {
        this.id = checkList._id;
        this.userId = checkList.userId;
        this.name = checkList.name;
        this.items = checkList.items;
    }

    id?: String;

    userId: String;

    name: String;

    items: ListItem[];
}