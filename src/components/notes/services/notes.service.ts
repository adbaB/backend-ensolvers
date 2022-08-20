import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotesDto, UpdateNoteDto } from '../dtos/notes.dtos';

@Injectable()
export class NotesService {
  Find(id: number, archived: boolean) {
    console.log(id);
    if (id === 10) {
      throw new NotFoundException('el id 10 no se encontro');
    }
    return {
      id,
      archived,
    };
  }
  Create(payload: CreateNotesDto) {
    return { payload };
  }
  Update(id: number, payload: UpdateNoteDto) {
    return {
      id,
      payload,
    };
  }
  Delete(id: number) {
    return {
      id,
    };
  }
}
