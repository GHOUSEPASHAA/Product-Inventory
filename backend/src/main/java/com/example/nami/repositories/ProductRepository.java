package com.example.nami.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.nami.models.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
}
