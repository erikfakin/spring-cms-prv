package com.efakin.springcms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static com.efakin.springcms.constants.SecurityConstants.*;
public class AuthorizationFilter extends BasicAuthenticationFilter {

    public AuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    // Filter to get the header with the JWT token of the requests and authenticate it.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_NAME);
        if(header == null) {
            chain.doFilter(request,response);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = authenticate(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    // Authentication of the JWT token. If the token is valid and we find the user in the database, we authenticate the request.
    private UsernamePasswordAuthenticationToken authenticate ( HttpServletRequest request ) {
        String token = request.getHeader(HEADER_NAME);
        if (token != null) {
            Claims user = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            } else {
                return null;
            }
        }
        return null;
    }
}
