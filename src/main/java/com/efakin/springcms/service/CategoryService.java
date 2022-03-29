package com.efakin.springcms.service;

import com.efakin.springcms.entity.Category;
import com.efakin.springcms.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.getById(categoryId);
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long categoryId, Category category) throws EntityNotFoundException {
        Optional<Category> categoryFound = categoryRepository.findById(categoryId);
        if (categoryFound.isPresent()) {
            Category categoryToUpdate = categoryFound.get();
            categoryToUpdate.setTitle(category.getTitle());
            categoryToUpdate.setDescription(category.getDescription());
            return categoryRepository.save(categoryToUpdate);

        } else {
            throw new EntityNotFoundException("Category with id " + categoryId + " could not be found.");
        }

    }

    public void delete(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
