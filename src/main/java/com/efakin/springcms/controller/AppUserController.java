package com.efakin.springcms.controller;

import com.efakin.springcms.entity.AppUser;
import com.efakin.springcms.repository.AppUserRepository;
import com.efakin.springcms.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    AppUserService appUserService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;


    @GetMapping()
    public List<AppUser> getAllUsers (){
        return appUserService.findAll();
    }

    // Used for registering new users
    @PostMapping("/register")
    public void signUp(@RequestBody AppUser user) {
        appUserService.save(user);
    }

    // Used to refresh the JWT token used for authentication. The token expiration time is limited.
    // By making a post request to "/refresh" with a valid token, the server returns a new valid token with a new expiration time.


    @PostMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        appUserService.refreshToken(request, response);

    }

}
