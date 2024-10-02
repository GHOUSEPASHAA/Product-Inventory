package com.example.nami;

import io.jsonwebtoken.*;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final SecretKey secretKey;

    public JwtTokenProvider() {
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Generates a secure key
    }

    private final int jwtExpirationInMs = 3600000; // 1 hour

    public String generateToken(Authentication authentication) {
        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
                .signWith(secretKey) // Use the generated secret key
                .compact();
    }
    
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Authentication getAuthentication(String token) {
        String username = getUsernameFromToken(token); // Extract the username from the token
        UserDetails userDetails = loadUserByUsername(username); // You need to implement this method or use a service
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public UserDetails loadUserByUsername(String username) {
        // Use your user details service to fetch the user by username
        return new org.springframework.security.core.userdetails.User(
            username,
            "",  // Password (optional depending on your use case)
            new ArrayList<>() // Authorities (roles) - configure as per your need
        );
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token); // Use the generated secret key
            return true;
        } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody(); // Use the generated secret key
        return claims.getSubject();
    }
}
