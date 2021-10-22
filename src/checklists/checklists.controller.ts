import { Body, Controller, Delete, Get, Param, Patch, Put, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "src/authentication/dto/user.dto";
import { JwtAuthGuard } from "src/authentication/jwt-auth.guard";
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

    @UseGuards(JwtAuthGuard)
    @Patch('update/id/:id')
    async updateList(@Param('id') id: String, @Body() body: ChecklistDto) {
        await this.listservice.updateList(id, body);
        return { message: 'List updated'};
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/id/:id')
    async deletelist(@Param('id') id: String) {
        await this.listservice.deleteList(id);
        return { message: 'List Deleted'};
    }

    @UseGuards(JwtAuthGuard)
    @Get('getAll')
    async getAllList(@Request() req) {
        return this.listservice.getAllList(req.user.id);
    }
}