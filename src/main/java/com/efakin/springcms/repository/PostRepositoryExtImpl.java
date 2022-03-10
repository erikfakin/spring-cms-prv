package com.efakin.springcms.repository;


import com.efakin.springcms.entity.Post;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.scope.SearchScope;
import org.hibernate.search.mapper.orm.session.SearchSession;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Slf4j
public class PostRepositoryExtImpl implements PostRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Post> search(String terms, int page, int perPage) {

        SearchSession searchSession = Search.session( em );

        SearchScope<Post> scope = searchSession.scope( Post.class );

        SearchResult<Post> result = searchSession.search( scope )
                .where( scope.predicate().match()
                        .fields( "title", "content" )
                        .matching( terms )
                        .toPredicate() )
                .fetch((page - 1)*perPage, 100 );
        log.info(Long.toString(result.total().hitCount()));
        return result.hits();


    }

}
