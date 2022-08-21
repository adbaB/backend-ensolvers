import {
  IsString,
  IsBoolean,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateNotesDto {
  @IsString()
  @IsUUID()
  readonly id?: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly archived: boolean;

  @IsArray()
  readonly categoriesIds: string[];
}

export class UpdateNoteDto extends PartialType(CreateNotesDto) {}
