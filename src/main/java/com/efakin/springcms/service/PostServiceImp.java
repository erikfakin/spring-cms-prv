package com.efakin.springcms.service;

import com.efakin.springcms.dto.PostsListDTO;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;
import com.efakin.springcms.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PostServiceImp implements  PostService{

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Post getPostById(Long postId){
        return postRepository.findById(postId).get();
    }

    @Override
    public Post savePost(Post post) throws UnsupportedEncodingException {
        String postUrl = URLEncoder.encode(post.getTitle(),"UTF-8");
        postUrl.replace("+", "-");

        if (postRepository.existsByUrl(postUrl)) {
            int counter = 1;
            while (postRepository.existsByUrl(postUrl+"-"+counter)) {
                counter++;
            }
            postUrl = postUrl + "-" + counter;
        }

        post.setUrl(postUrl);
        return postRepository.save(post);
    }

    @Override
    public GetAllPostsResponse getAllPosts(int page, String orderBy, String order, int perPage) {
        Sort sort = Sort.by(orderBy).descending();

        if (order.equalsIgnoreCase("asc")) {
            sort = sort.ascending();
        }

        Pageable sorting = PageRequest.of(page  - 1, perPage, sort);
        Page postsPage = postRepository.findAll(sorting);
        List<Post> posts = postsPage.toList();
        int totalPages = postsPage.getTotalPages();

        GetAllPostsResponse getAllPostsResponse = new GetAllPostsResponse();
        getAllPostsResponse.setTotalPages(totalPages);
        getAllPostsResponse.setCurrentPage(page);
        getAllPostsResponse.setPosts(posts.stream().map(post -> modelMapper.map(post, PostsListDTO.class))
                .collect(Collectors.toList()));

        return getAllPostsResponse;
    }

    @Override
    public Post updatePost(Long postId, Post post) {
        Post postToUpdate = postRepository.findById(postId).get();
        postToUpdate.setTitle(post.getTitle());
        postToUpdate.setDescription(post.getDescription());
        postToUpdate.setContent(post.getContent());
        postToUpdate.setFeaturedImage(post.getFeaturedImage());
        postToUpdate.setCategory(post.getCategory());

        return postRepository.save(postToUpdate);
    }

    @Override
    public void delete(Long postId) {
        postRepository.deleteById(postId);

    }

    @Override
    public GetAllPostsResponse searchAllPosts(String searchString) {
        List<Post> postsWithContent = postRepository.findByContentContainingIgnoreCase(searchString);
        List<Post> postsWithTitle = postRepository.findByTitleContainingIgnoreCase(searchString);

        postsWithTitle.removeAll(postsWithContent);
        postsWithContent.addAll(postsWithTitle);

        List<Post> posts= new ArrayList<>(postsWithContent);

        log.info(posts.toString());
        return new GetAllPostsResponse();

    }
}
