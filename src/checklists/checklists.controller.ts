import { Body, Controller, Delete, Param, Patch, Put } from "@nestjs/common";
import { ChecklistDto } from "src/checklists/dto/checklists.dto";
import { ListService } from "./checklists.service";

@Controller('checklists')
export class ListController {
    constructor(private readonly listservice: ListService) {}

    @Put('create')
    async addList(@Body() body: ChecklistDto) {
        await this.listservice.createList(body);
        return { message: 'List Created'};
    }

    @Patch('update/id/:id')
    async updateList(@Param('id') id: string, @Body() body: ChecklistDto) {
        await this.listservice.updateList(id, body);
        return { message: 'List updated'};
    }

    @Delete('delete')
    async deletelist(@Body() body: ChecklistDto) {
        await this.listservice.deleteList(body);
        return { message: 'List Deleted'};
    }
}