package com.efakin.springcms.dto;

import com.efakin.springcms.entity.Category;
import com.efakin.springcms.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostsListDTO {

    private Long id;
    private String author;
    private String description;
    private String title;
    private String url;
    private Category category;
    private Image featuredImage;
    private Date createdAt;
    private Date updatedAt;


}
