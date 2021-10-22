import { CheckListDocument } from "src/Database/Checklists/checklists.model";
import { ChecklistDto } from "./checklists.dto";

export class AllListsDto {

    constructor(allLists: CheckListDocument[]) {
        this.lists = new Array<ChecklistDto>();
        allLists.forEach(element => {
            this.lists.push(new ChecklistDto(element));    
        });    
    }

    lists: ChecklistDto[];
}