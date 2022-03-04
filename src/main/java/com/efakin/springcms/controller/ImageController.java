package com.efakin.springcms.controller;

import com.efakin.springcms.entity.Image;
import com.efakin.springcms.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/{imageId}")
    public Image getImageById(@PathVariable("imageId") Long imageId) {
        return imageService.getImageById(imageId);
    }

    @PutMapping("/{imageId}")
    public Image updateImageInfoById(@PathVariable("imageId") Long imageId, @RequestBody Image image) throws FileNotFoundException {
        return imageService.updateImageInfoById(imageId, image);
    }
}
