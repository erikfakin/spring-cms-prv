package com.efakin.springcms.service;

import com.efakin.springcms.dto.PostsListDTO;
import com.efakin.springcms.entity.Post;
import com.efakin.springcms.models.GetAllPostsResponse;
import com.efakin.springcms.repository.PostRepository;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Post getPostById(Long postId){
        return postRepository.findById(postId).get();
    }

    public Post savePost(Post post) throws UnsupportedEncodingException {
        return postRepository.save(post);
    }

    // Gets all posts, paginated and sorted.
    public GetAllPostsResponse getAllPosts(int page, String orderBy, String order, int perPage) {
        Sort.Order sortOrder;
        if (order.equalsIgnoreCase("asc")){
            sortOrder = new Sort.Order(Sort.Direction.ASC, orderBy).ignoreCase();
        } else {
            sortOrder = new Sort.Order(Sort.Direction.DESC, orderBy).ignoreCase();
        }
        Sort sort = Sort.by(sortOrder);
        Pageable sorting = PageRequest.of(page  - 1, perPage, sort);
        Page<Post> postsPage = postRepository.findAll(sorting);
        List<Post> posts = postsPage.toList();
        int totalPages = postsPage.getTotalPages();
        Long totalPosts = postsPage.getTotalElements();

        GetAllPostsResponse getAllPostsResponse = new GetAllPostsResponse();
        getAllPostsResponse.setTotalPages(totalPages);
        getAllPostsResponse.setTotalPosts(totalPosts);
        getAllPostsResponse.setCurrentPage(page);
        getAllPostsResponse.setPosts(posts.stream().map(post -> modelMapper.map(post, PostsListDTO.class))
                .collect(Collectors.toList()));

        return getAllPostsResponse;
    }

    public Post updatePost(Long postId, Post post) throws EntityNotFoundException {
        Optional<Post> postFound = postRepository.findById(postId);
        if(postFound.isPresent()) {
            Post postToUpdate = postFound.get();
            postToUpdate.setTitle(post.getTitle());
            postToUpdate.setDescription(post.getDescription());
            postToUpdate.setContent(post.getContent());
            postToUpdate.setFeaturedImage(post.getFeaturedImage());
            postToUpdate.setCategory(post.getCategory());
            postToUpdate.setPinned(post.isPinned());
            return postRepository.save(postToUpdate);
        } else {
            throw new EntityNotFoundException("Post with id " + postId + " was not found.");
        }
    }

    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }

    public GetAllPostsResponse searchAllPosts(String searchString, int page, int perPage) {
        return postRepository.search(searchString, page, perPage);
    }

    //Gets all posts in category, paginated and sorted.
    public GetAllPostsResponse getAllPostsByCategory(String categoryTitle, int page, String orderBy, String order, int perPage) {
        Sort sort = Sort.by(orderBy).descending();

        if (order.equalsIgnoreCase("asc")) {
            sort = sort.ascending();
        }

        Pageable sorting = PageRequest.of(page  - 1, perPage, sort);
        Page<Post> postsPage = postRepository.findByCategoryTitleIgnoreCase(categoryTitle, sorting);
        List<Post> posts = postsPage.toList();
        int totalPages = postsPage.getTotalPages();

        GetAllPostsResponse getAllPostsResponse = new GetAllPostsResponse();
        getAllPostsResponse.setTotalPages(totalPages);
        getAllPostsResponse.setCurrentPage(page);
        getAllPostsResponse.setPosts(posts.stream().map(post -> modelMapper.map(post, PostsListDTO.class))
                .collect(Collectors.toList()));

        return getAllPostsResponse;
    }

    // Gets all pinned posts.
    public List<PostsListDTO> getAllPinnedPosts() {
        List<Post> posts = postRepository.findAllByPinned(true);
        List<PostsListDTO> dtoPosts = posts.stream().map(post -> modelMapper.map(post, PostsListDTO.class))
                .collect(Collectors.toList());
        return dtoPosts;
    }


}
