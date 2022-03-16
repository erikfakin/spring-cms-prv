package com.efakin.springcms.repository;

import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;

import java.util.List;

public interface PostRepositoryExt {
    GetAllPostsResponse search(String terms, int page, int perPage);
}
