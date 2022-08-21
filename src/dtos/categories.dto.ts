import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
export class createCategoriesDto {
  @IsString()
  @IsUUID()
  readonly id?: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
