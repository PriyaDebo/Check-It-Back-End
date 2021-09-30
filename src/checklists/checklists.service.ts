import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, Types } from "mongoose";
import { ChecklistDto } from "src/checklists/dto/checklists.dto";
import { CheckList, CheckListDocument } from "src/Database/Checklists/checklists.model";

@Injectable()
export class ListService {

    constructor(@InjectModel('Checklists') private readonly listModel: Model<CheckListDocument>) {}

    async findlist(id: string): Promise<CheckListDocument> {
        return await this.listModel.findOne({_id: id});
    }

    async createList(createChecklistDto: ChecklistDto) {
        var name = createChecklistDto.name;
        var items = createChecklistDto.items;
        var userId = createChecklistDto.userId;
        const newList = new this.listModel({
            userId,
            name,
            items
        });
        const checklist = await newList.save();
        return checklist;
    }

    async updateList(id: string, updateChecklistDto: ChecklistDto) {
        var items = updateChecklistDto.items;
        const checklist = await this.findlist(id);
        if (!checklist) {
            throw new NotFoundException('List not found');
        }
        checklist.name = updateChecklistDto.name;
        checklist.items = items;
        // return await this.listModel.updateOne(checklist);
        checklist.save();
        return checklist;
    }

    async deleteList(deleteListDto: ChecklistDto) {
        var id = deleteListDto.id;
        const result = await this.listModel.deleteOne({id});
        if (result.n === 0) {
            throw new NotFoundException('List not found');
        }
    }
}