import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import FindOneParams from 'src/utils/findOneParams';
import CategoriesService from './categories.service';
import CreateCategoryDto from './dto/createCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }
}
