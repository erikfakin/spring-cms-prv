package com.efakin.springcms.service;

import com.efakin.springcms.entity.Category;
import com.efakin.springcms.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService{

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.getById(categoryId);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category categoryToUpdate = categoryRepository.findById(categoryId).get();
        categoryToUpdate.setTitle(category.getTitle());
        categoryToUpdate.setDescription(category.getDescription());
        return categoryRepository.save(categoryToUpdate);
    }

    @Override
    public void delete(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
