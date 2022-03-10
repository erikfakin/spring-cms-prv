package com.efakin.springcms.repository;


import com.efakin.springcms.entity.Post;
import org.hibernate.search.mapper.orm.Search;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class PostRepositoryExtImp implements PostRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Post> search(String terms, int page, int perPage) {
        return Search.session(em).search(Post.class)
                .where(f -> f.match()
                        .fields("title", "content")
                        .matching(terms))
                .fetchHits(page*perPage, perPage);
    }

}
