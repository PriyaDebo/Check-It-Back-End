import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from 'src/Database/Checklists/checklists.model';
import { ListController } from './checklists.controller';
import { ListService } from './checklists.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Checklists', schema: ListSchema}])],
    controllers: [ListController],
    providers: [ListService],
    exports: [ListService],
})
export class ChecklistsModule {}
