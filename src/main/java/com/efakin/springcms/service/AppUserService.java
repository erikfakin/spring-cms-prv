package com.efakin.springcms.service;

import com.efakin.springcms.entity.AppUser;
import com.efakin.springcms.repository.AppUserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Date;
import java.util.List;

import static com.efakin.springcms.constants.SecurityConstants.*;

@Service
public class AppUserService {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    // Used for refreshing the token. We return a new token in the header of the response.
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String oldToken = request.getHeader(HEADER_NAME);
        if (oldToken != null) {
            Claims user = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes()))
                    .build()
                    .parseClaimsJws(oldToken)
                    .getBody();
            if (user != null) {
                Date exp = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
                Key key = Keys.hmacShaKeyFor(KEY.getBytes());
                String token = Jwts.builder().setClaims(user).signWith(key, SignatureAlgorithm.HS512).setExpiration(exp).compact();
                response.addHeader("Token", token);
            }
        }
    }

    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    public void save(AppUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        appUserRepository.save(user);
    }
}
