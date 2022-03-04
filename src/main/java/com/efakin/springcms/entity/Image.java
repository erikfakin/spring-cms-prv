package com.efakin.springcms.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String alt;
    private String description;

    @Column(unique = true)
    private String src;

}
