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
  @Post()
  async Create(@Body() data: createCategoriesDto) {
    const newCategory = await this.categoriesService.Create(data);
    return { newCategory };
  }
  @Delete()
  Delete(@Param() id: number) {
    const category = this.categoriesService.Delete(id);
    return { category };
  }
}
