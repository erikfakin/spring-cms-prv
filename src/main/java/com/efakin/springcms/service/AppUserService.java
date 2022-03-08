package com.efakin.springcms.service;

import com.efakin.springcms.entity.AppUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface AppUserService {
    void refreshToken(HttpServletRequest request, HttpServletResponse response);

    List<AppUser> findAll();

    void save(AppUser user);
}
