import { Injectable, NotFoundException } from '@nestjs/common';
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

  async Find(id: number, archived: boolean) {
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
    console.log(notes);
    if (notes.length === 0) {
      throw new NotFoundException('Notes not found');
    }
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

  async Update(id: number, changes: UpdateNoteDto) {
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
