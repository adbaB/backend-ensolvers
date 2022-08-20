import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './components/notes/controllers/notes.controller';
import { NotesService } from './components/notes/services/notes.service';

@Module({
  imports: [],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
