package com.efakin.springcms.repository;

import com.efakin.springcms.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    boolean existsByUrl(String url);


    List<Post> findByContentContainingIgnoreCase(String searchString);
    List<Post> findByTitleContainingIgnoreCase(String searchString);


}