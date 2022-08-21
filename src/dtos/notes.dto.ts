import { IsString, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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
  readonly categoriesIds: number[];
}

export class UpdateNoteDto extends PartialType(CreateNotesDto) {}
