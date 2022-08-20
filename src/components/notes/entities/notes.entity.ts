import { Categories } from '../../../entities/categories.entity';
export class Notes {
  id?: number;
  title: string;
  description: string;
  archived: boolean;
  tags: Categories[];
}
