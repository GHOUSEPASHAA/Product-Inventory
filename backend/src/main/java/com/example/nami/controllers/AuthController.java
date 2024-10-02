package com.example.nami.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.nami.JwtTokenProvider;
import com.example.nami.models.JwtAuthenticationResponse;
import com.example.nami.models.LoginRequest;
import com.example.nami.models.RegisterRequest;
import com.example.nami.models.User;
import com.example.nami.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Attempting to log in user: {}", loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            String token = jwtTokenProvider.generateToken(authentication);
            logger.info("User {} logged in successfully", loginRequest.getUsername());
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        } catch (Exception e) {
            logger.error("Login failed for user {}: {}", loginRequest.getUsername(), e.getMessage());
            return ResponseEntity.status(403).body("Login failed");
        }
    }

   @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    logger.info("Attempting to register user: {}", registerRequest.getUsername());
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
        logger.warn("Username {} already exists", registerRequest.getUsername());
        return ResponseEntity.badRequest().body("Username already exists");
    }
    User user = new User();
    user.setUsername(registerRequest.getUsername());
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    userRepository.save(user);
    logger.info("User {} registered successfully", registerRequest.getUsername());
    return ResponseEntity.ok("User registered successfully");
}

}
