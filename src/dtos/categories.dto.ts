import { IsString, IsNotEmpty } from 'class-validator';
export class createCategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
