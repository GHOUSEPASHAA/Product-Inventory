package com.example.nami.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

import com.example.nami.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
    
}