package com.efakin.springcms.models;

import com.efakin.springcms.dto.PostsListDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// Response for requests to get a list of posts, when we are not interested in all the data of Post.
@Data
@NoArgsConstructor
public class GetAllPostsResponse {
    private int totalPages;
    private Long totalPosts;
    private int currentPage;
    private List<PostsListDTO> posts;
}
