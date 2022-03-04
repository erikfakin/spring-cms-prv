package com.efakin.springcms.controller;

import com.efakin.springcms.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@RestController
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {

        try {
            storageService.saveFile(file);
        } catch (IOException e) {
            e.printStackTrace();
            return "failed";
        }

        return "success";
    }

}
