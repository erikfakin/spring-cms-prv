package com.efakin.springcms.service;

import com.efakin.springcms.entity.Image;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

public interface ImageService {
    Image updateImageInfoById(Long id, Image image) throws FileNotFoundException;
    Image saveImage(Image image);

    List<Image> getAllImages();

    Image getImageById(Long imageId);

    void delete(Long imageId) throws IOException;
}
