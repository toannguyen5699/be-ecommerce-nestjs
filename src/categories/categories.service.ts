import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Category from './category.entity';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: ['post'],
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: ['post'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }
}
