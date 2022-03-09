package com.efakin.springcms.models;

import com.efakin.springcms.dto.PostsListDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetAllPostsResponse {

    private int totalPages;
    private int currentPage;
    private List<PostsListDTO> posts;
}
