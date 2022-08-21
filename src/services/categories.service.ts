import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { createCategoriesDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
  ) {}
  Find() {
    return this.categoriesRepo.find();
  }

  async FindOne(id: number) {
    const category = await this.categoriesRepo.findOne({
      where: {
        id,
      },
    });
    if (!category) {
      throw new NotFoundException(`category ${id} not found`);
    }
    return category;
  }
  Create(data: createCategoriesDto) {
    const newCategory = this.categoriesRepo.create(data);
    return this.categoriesRepo.save(newCategory);
  }
  Delete(id: number) {
    return this.categoriesRepo.delete(id);
  }
}
