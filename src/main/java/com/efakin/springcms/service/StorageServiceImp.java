package com.efakin.springcms.service;

import com.efakin.springcms.entity.Image;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class StorageServiceImp implements StorageService{

    @Value("${upload.basePath}")
    private String baseLocation;
    @Value("${upload.folderPath}")
    private String folderLocation;

    @Autowired
    private ServletContext context;

    @Autowired
    private ImageService imageService;

    @Override
    public void saveFile(MultipartFile file) throws IOException {


        //Upload the image
        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(baseLocation + folderLocation + fileName);
        Path relativePath = Paths.get("/"+folderLocation + "/" + fileName);

        Path p = Files.write(path, bytes);

        //Save the image to the database
        Image image = new Image();
        image.setTitle(fileName);
        image.setSrc(relativePath.normalize().toString().replace("\\","/"));
        imageService.saveImage(image);

    }

    @Override
    public void deleteFile(String title) throws IOException {
        Path path = Paths.get(folderLocation + title);
        Files.delete(path);
    }


}
