package com.efakin.springcms.config;

import com.efakin.springcms.entity.AppUser;
import com.efakin.springcms.entity.Category;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.repository.AppUserRepository;
import com.efakin.springcms.repository.PostRepository;
import com.efakin.springcms.service.CategoryService;
import com.efakin.springcms.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InitData implements ApplicationRunner {


    @Autowired
    private PostService postService;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private CategoryService categoryService;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        Category category1 = new Category();
        category1.setTitle("News");
        Category category2 = new Category();
        category2.setTitle("Info");
        categoryService.saveCategory(category1);
        categoryService.saveCategory(category2);


        Post post1 = new Post();
        post1.setTitle("a ");
        post1.setDescription("a #1");
        post1.setContent("Long content 1");
        post1.setCategory(category1);
        Post post2 = new Post();
        post2.setTitle("b 1");
        post2.setDescription("Descrišptiopn #1");
        post2.setContent("Long content 2");
        post2.setCategory(category2);
        postService.savePost(post1);
        postService.savePost(post2);
        AppUser adminUser = new AppUser();
        adminUser.setUsername("admin");
        adminUser.setPassword(bCryptPasswordEncoder.encode("admin"));
        appUserRepository.save(adminUser);

    }
}
