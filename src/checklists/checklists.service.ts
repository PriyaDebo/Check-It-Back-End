import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query, Types } from "mongoose";
import { UserDto } from "src/authentication/dto/user.dto";
import { ChecklistDto } from "src/checklists/dto/checklists.dto";
import { CheckList, CheckListDocument } from "src/Database/Checklists/checklists.model";
import { AllListsDto } from "./dto/alllists.dto";

@Injectable()
export class ListService {

    constructor(@InjectModel('Checklists') private readonly listModel: Model<CheckListDocument>) {}

    async findlist(id: String): Promise<CheckListDocument> {
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

    async updateList(id: String, updateChecklistDto: ChecklistDto) {
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

    async deleteList(id: String) {
        const result = await this.listModel.findByIdAndDelete(id);
        if (result == null) {
            throw new NotFoundException('List not found');
        }
    }

    async getAllList(userid: String) {
        const result = await this.listModel.find({userId: userid});
        var allLists = new AllListsDto(result);
        return allLists;
    }
}