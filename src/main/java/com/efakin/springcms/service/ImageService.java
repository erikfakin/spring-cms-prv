package com.efakin.springcms.service;

import com.efakin.springcms.entity.Image;
import com.efakin.springcms.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image updateImageInfoById(Long id, Image image) throws FileNotFoundException {
        Optional<Image> imageFound = imageRepository.findById(id);

        if (imageFound.isPresent()) {
            Image imageToUpdate = imageFound.get();
            if (Objects.nonNull(image.getTitle())) {
                imageToUpdate.setTitle(image.getTitle());
            }
            if (Objects.nonNull(image.getDescription())) {
                imageToUpdate.setDescription(image.getDescription());
            }
            if (Objects.nonNull(image.getAlt())) {
                imageToUpdate.setAlt(image.getAlt());
            }
            return imageRepository.save(imageToUpdate);
        } else {
            throw new FileNotFoundException("File not found");
        }
    }


    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Image getImageById(Long imageId) {
        return imageRepository.getById(imageId);
    }

    public void delete(Long imageId) throws IOException {
        imageRepository.deleteById(imageId);
    }
}
