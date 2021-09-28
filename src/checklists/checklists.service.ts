import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { ChecklistDto } from "src/authentication/dto/checklists.dto";
import { List as CheckList } from "src/Database/Checklists/checklists.model";

@Injectable()
export class ListService {

    constructor(@InjectModel('Checklists') private readonly listModel: Model<CheckList>) {}

    async findlist(id: string, name: string): Promise<CheckList> {
        return await this.listModel.findOne({id, name});
    }

    async createList(createChecklistDto: ChecklistDto) {
        var id = createChecklistDto.id;
        var name = createChecklistDto.name;
        var items = createChecklistDto.items;
        const newList = new this.listModel({
            id,
            name,
            items
        });
        if (await this.findlist(id, name)) {
            throw new BadRequestException('username exists');
        }
        const checklist = await newList.save();
        return checklist;
    }

    async updateList(updateChecklistDto: ChecklistDto) {
        var id = updateChecklistDto.id;
        var name = updateChecklistDto.name;
        var items = updateChecklistDto.items;
        const checklist = await this.findlist(id, name);
        if (!checklist) {
            throw new NotFoundException('List not found');
        }
        checklist.items = items;
        this.listModel.save(checklist);
    }

    async deleteList(deleteListDto: ChecklistDto) {
        var id = deleteListDto.id;
        var name = deleteListDto.name;
        var items = deleteListDto.items;
        const result = await this.listModel.deleteOne({id: id, name: name});
        if (result.n === 0) {
            throw new NotFoundException('List not found');
        }
    }
}