package com.efakin.springcms.service;

import com.efakin.springcms.dto.PostsListDTO;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;

import javax.persistence.EntityNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;


public interface PostService {
    Post getPostById(Long postId);

    Post savePost(Post post) throws UnsupportedEncodingException;

    GetAllPostsResponse getAllPosts(int page, String orderBy, String order, int perPage);

    Post updatePost(Long postId, Post post) throws EntityNotFoundException;

    void delete(Long postId);

    GetAllPostsResponse searchAllPosts(String searchString, int page, int perPage);

    GetAllPostsResponse getAllPostsByCategory(String categoryTitle, int page, String orderBy, String order, int perPage);

    List<PostsListDTO> getAllPinnedPosts();
}
