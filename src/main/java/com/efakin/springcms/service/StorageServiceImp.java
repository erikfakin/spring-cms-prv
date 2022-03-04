package com.efakin.springcms.service;

import com.efakin.springcms.entity.Image;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
@Slf4j
public class StorageServiceImp implements StorageService{

    @Value("${upload.path}")
    private String folder;

    @Autowired
    private ServletContext context;

    @Autowired
    private ImageService imageService;

    @Override
    public void init() {

    }

    @Override

    public void saveFile(MultipartFile file) throws IOException {


        //Upload the image
        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(folder + fileName);
        Path relativePath = Paths.get("/uploads/" + fileName);

        log.info(path.toString());
        Files.write(path, bytes);

        //Save the image in the database
        Image image = new Image();
        image.setTitle(fileName);
        image.setSrc(relativePath.toString());
        imageService.saveImage(image);

    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public Path load(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {

    }
}
