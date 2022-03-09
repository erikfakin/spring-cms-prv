package com.efakin.springcms.controller;

import com.efakin.springcms.dto.PostsListDTO;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;
import com.efakin.springcms.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public GetAllPostsResponse getAllPosts(@RequestParam(required = false, defaultValue = "1") int page, @RequestParam(required = false, defaultValue = "date") String orderBy, @RequestParam(required = false, defaultValue = "desc") String order, @RequestParam(required = false, defaultValue = "10") int perPage) {
        return postService.getAllPosts(page, orderBy, order, perPage);
    }
    @GetMapping("/search")
    public GetAllPostsResponse searchAllPosts(@RequestParam String q) {
        return postService.searchAllPosts(q);
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

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable("postId") Long postId) {
        postService.delete(postId);
    }





}
