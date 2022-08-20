import { IsString, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Categories } from 'src/entities/categories.entity';

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly archived: boolean;

  @IsArray()
  readonly tags: Categories[];
}

export class UpdateNoteDto extends PartialType(CreateNotesDto) {}
