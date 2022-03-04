package com.efakin.springcms.config;

import com.efakin.springcms.entity.Post;
import com.efakin.springcms.repository.PostRepository;
import com.efakin.springcms.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InitData implements ApplicationRunner {


    @Autowired
    private PostService postService;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        Post post1 = new Post();
        post1.setTitle("Post1");
        post1.setDescription("Descrišptiopn #1");
        post1.setContent("Long cointent 1");
        Post post2 = new Post();
        post2.setTitle("Post1");
        post2.setDescription("Descrišptiopn #1");
        post2.setContent("Long cointent 1");
        postService.savePost(post1);
        postService.savePost(post2);

    }
}
