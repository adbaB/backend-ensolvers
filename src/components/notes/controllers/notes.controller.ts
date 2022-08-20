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
import { CreateNotesDto, UpdateNoteDto } from './../dtos/notes.dtos';
import { NotesService } from './../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  Find(
    @Query('tagId', ParseIntPipe) tagId: number,
    @Query('Archived') archived = false,
  ) {
    const newArray = this.notesService.Find(tagId, archived);
    return {
      data: { tagId, archived },
      newArray,
    };
  }

  @Post()
  Create(@Body() payload: CreateNotesDto) {
    const newArray = this.notesService.Create(payload);
    return {
      message: 'esto es un mensaje',
      newArray,
    };
  }
  @Put(':id')
  Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNoteDto,
  ) {
    const newArray = this.notesService.Update(id, payload);
    return {
      message: 'objeto actualizado',
      newArray,
    };
  }

  @Delete(':id')
  Delete(@Param('id', ParseIntPipe) id: number) {
    const newArray = this.notesService.Delete(id);
    return {
      message: 'objeto Borrado',
      newArray,
    };
  }
}
