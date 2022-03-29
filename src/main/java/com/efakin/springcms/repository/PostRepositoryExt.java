package com.efakin.springcms.repository;

import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;

import java.util.List;

// Used to implement Hibernate Search
public interface PostRepositoryExt {
    GetAllPostsResponse search(String terms, int page, int perPage);
}
