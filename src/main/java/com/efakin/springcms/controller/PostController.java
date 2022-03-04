package com.efakin.springcms.controller;

import com.efakin.springcms.entity.Post;
import com.efakin.springcms.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping()
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{postId}")
    public Post getPostByName(@PathVariable("postId") Long postId) {
        return postService.getPostById(postId);
    }

    @PostMapping()
    public Post savePost(@RequestBody Post post) throws UnsupportedEncodingException {
        return postService.savePost(post);
    }

    @PutMapping("/{postId}")
    public Post updatePost(@PathVariable("postId") Long postId, @RequestBody Post post) {
        return postService.updatePost(postId, post);
    }





}
