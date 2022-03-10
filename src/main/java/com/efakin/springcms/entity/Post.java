package com.efakin.springcms.entity;

import lombok.Data;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Indexed
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @FullTextField
    private String title;

    private String description;

    @FullTextField
    @Column(columnDefinition = "text")
    private String content;

    @ManyToOne
    @JoinColumn(name ="image_id")
    private Image featuredImage;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String author = "author";

    @Column(unique = true)
    private String url;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date updatedAt;

    @PrePersist
    private void onCreate() {
        createdAt = new Date();
        updatedAt = createdAt;
    }

    @PreUpdate
    private void onUpdate() {
        updatedAt = new Date();
    }




}
