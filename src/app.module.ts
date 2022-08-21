import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';

import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { Notes } from './entities/notes.entity';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        HOST: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Notes, Category]),
  ],
  controllers: [AppController, NotesController, CategoriesController],
  providers: [AppService, NotesService, CategoriesService],
})
export class AppModule {}
