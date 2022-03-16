package com.efakin.springcms.service;

import com.efakin.springcms.entity.Category;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(Long categoryId);

    Category saveCategory(Category category);

    Category updateCategory(Long categoryId, Category category) throws EntityNotFoundException;

    void delete(Long categoryId);
}
