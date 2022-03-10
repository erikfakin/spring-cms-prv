package com.efakin.springcms.repository;

import com.efakin.springcms.entity.Post;

import java.util.List;

public interface PostRepositoryExt {



    List<Post> search(String terms, int page, int perPage);
}
