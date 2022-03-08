package com.efakin.springcms.controller;

import com.efakin.springcms.entity.AppUser;
import com.efakin.springcms.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    AppUserRepository appUserRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping()
    public List<AppUser> getAllUsers (){
        return appUserRepository.findAll();
    }

    @PostMapping("/register")
    public void signUp(@RequestBody AppUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        appUserRepository.save(user);
    }
//    @PostMapping("/refresh")
//    public void refreshToken()

}
