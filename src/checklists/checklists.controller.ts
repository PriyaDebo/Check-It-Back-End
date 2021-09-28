import { Body, Controller, Delete, Patch, Put } from "@nestjs/common";
import { ChecklistDto } from "src/authentication/dto/checklists.dto";
import { ListService } from "./checklists.service";

@Controller('checklists')
export class ListController {
    constructor(private readonly listservice: ListService) {}

    @Put('create')
    async addList(@Body() body: ChecklistDto) {
        await this.listservice.createList(body);
        return { message: 'List Created'};
    }

    @Patch('update')
    async updateList(@Body() body: ChecklistDto) {
        await this.listservice.updateList(body);
        return { message: 'List updated'};
    }

    @Delete('delete')
    async deletelist(@Body() body: ChecklistDto) {
        await this.listservice.deleteList(body);
        return { message: 'List Deleted'};
    }
}