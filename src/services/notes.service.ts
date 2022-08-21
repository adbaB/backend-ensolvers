import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Notes } from 'src/entities/notes.entity';
import { CreateNotesDto, UpdateNoteDto } from '../dtos/notes.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private notesRepo: Repository<Notes>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}

  async Find(id: string, archived: boolean) {
    const notes = await this.notesRepo.find({
      relations: {
        categories: true,
      },
      where: {
        categories: {
          id: id,
        },
        archived,
      },
    });

    return notes;
  }

  async Create(data: CreateNotesDto) {
    const newNote = this.notesRepo.create(data);
    if (data.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(data.categoriesIds),
      });
      newNote.categories = categories;
    }
    return this.notesRepo.save(newNote);
  }

  async Update(id: string, changes: UpdateNoteDto) {
    const note = await this.notesRepo.findOneBy({ id });
    if (changes.categoriesIds) {
      const categories = await this.categoriesRepo.findBy({
        id: In(changes.categoriesIds),
      });
      note.categories = categories;
    }
    this.notesRepo.merge(note, changes);
    return this.notesRepo.save(note);
  }

  Delete(id: number) {
    return this.notesRepo.delete(id);
  }
}
