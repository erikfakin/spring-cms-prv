package com.efakin.springcms.repository;


import com.efakin.springcms.dto.PostsListDTO;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.scope.SearchScope;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class PostRepositoryExtImpl implements PostRepositoryExt{

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public GetAllPostsResponse search(String terms, int page, int perPage) {


        SearchSession searchSession = Search.session( em );

        SearchScope<Post> scope = searchSession.scope( Post.class );

        SearchResult<Post> result = searchSession.search( scope )
                .where( scope.predicate().match()
                        .fields( "title", "content" )
                        .matching( terms )
                        .toPredicate() )
                .fetch((page - 1)*perPage, perPage );



        int totalPages = (int) Math.ceil((float) result.total().hitCount() / perPage);

        List<Post> posts = result.hits();

        GetAllPostsResponse getAllPostsResponse = new GetAllPostsResponse();
        getAllPostsResponse.setTotalPages(totalPages);
        getAllPostsResponse.setTotalPosts(result.total().hitCount());
        getAllPostsResponse.setCurrentPage(page);
        getAllPostsResponse.setPosts(posts.stream().map(post -> modelMapper.map(post, PostsListDTO.class))
                .collect(Collectors.toList()));
        return getAllPostsResponse;


    }

}
