package com.efakin.springcms.service;

import com.efakin.springcms.entity.Post;
import com.efakin.springcms.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

@Service
public class PostServiceImp implements  PostService{

    @Autowired
    private PostRepository postRepository;

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
    public List<Post> getAllPosts() {
        return postRepository.findAll();
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
}
