package com.efakin.springcms.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {


    void saveFile(MultipartFile file) throws IOException;

    void deleteFile(String title) throws IOException;


}
