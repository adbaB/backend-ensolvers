import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateNotesDto, UpdateNoteDto } from '../dtos/notes.dto';
import { NotesService } from '../services/notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  async Find(
    @Query('categoryId') categoryId: string,
    @Query('archived') archived = false,
  ) {
    const notes = await this.notesService.Find(categoryId, archived);

    return {
      notes,
    };
  }

  @Post()
  async Create(@Body() data: CreateNotesDto) {
    const newNote = await this.notesService.Create(data);
    return {
      newNote,
    };
  }
  @Put(':id')
  async Update(@Param('id') id: string, @Body() changes: UpdateNoteDto) {
    const updatedNote = await this.notesService.Update(id, changes);
    return {
      updatedNote,
    };
  }

  @Delete(':id')
  async Delete(@Param('id') id: string) {
    const deletedNote = await this.notesService.Delete(id);
    return {
      deletedNote,
    };
  }
}
