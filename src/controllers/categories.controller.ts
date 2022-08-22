import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createCategoriesDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async FindAll() {
    const categories = await this.categoriesService.Find();
    return { categories };
  }
  @Get(':id')
  FindOne(@Param('id') id: string) {
    const category = this.categoriesService.FindOne(id);
    return category;
  }
  @Post()
  async Create(@Body() data: createCategoriesDto) {
    const newCategory = await this.categoriesService.Create(data);
    return { newCategory };
  }
  @Delete()
  Delete(@Param('id') id: string) {
    const category = this.categoriesService.Delete(id);
    return { category };
  }
}
