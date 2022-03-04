package com.efakin.springcms.service;

import com.efakin.springcms.entity.Post;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;


public interface PostService {
    Post getPostById(Long postId);

    Post savePost(Post post) throws UnsupportedEncodingException;

    List<Post> getAllPosts();

    Post updatePost(Long postId, Post post);
}
