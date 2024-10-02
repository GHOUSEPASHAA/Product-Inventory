package com.example.nami.controllers;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired; // Correct import
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.nami.models.Product;
import com.example.nami.repositories.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        logger.info("Fetching all products");
        List<Product> products = productRepository.findAll();
        logger.info("Retrieved {} products", products.size());
        return ResponseEntity.ok(products);
    }

    // Add a new product
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product, Authentication authentication) {
        logger.info("Attempting to add product: {}", product);

        // Use getName() to get the username
        String username = authentication != null ? authentication.getName() : "Anonymous";
        logger.info("Authenticated user: {}", username);

        try {
            Product savedProduct = productRepository.save(product);
            logger.info("Product added successfully: {}", savedProduct);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            logger.error("Error adding product: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
    

    // Delete a product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        logger.info("Attempting to delete product with ID: {}", id);

        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.deleteById(id);
            logger.info("Product deleted successfully: {}", id);
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            logger.error("Product with ID {} not found", id);
            return ResponseEntity.status(404).body("Product not found");
        }
    }
    

    // Increment product quantity
@PatchMapping("/{id}/increment")
public ResponseEntity<Product> incrementQuantity(@PathVariable String id) {
    logger.info("Incrementing quantity for product with ID: {}", id);
    
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isPresent()) {
        Product product = productOptional.get();
        product.setQuantity(product.getQuantity() + 1);
        Product updatedProduct = productRepository.save(product);
        logger.info("Product quantity incremented successfully: {}", updatedProduct);
        return ResponseEntity.ok(updatedProduct);
    } else {
        logger.error("Product with ID {} not found", id);
        return ResponseEntity.status(404).body(null);
    }
}

// Decrement product quantity
@PatchMapping("/{id}/decrement")
public ResponseEntity<Product> decrementQuantity(@PathVariable String id) {
    logger.info("Decrementing quantity for product with ID: {}", id);
    
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isPresent()) {
        Product product = productOptional.get();
        if (product.getQuantity() > 0) { // Ensure quantity does not go below zero
            product.setQuantity(product.getQuantity() - 1);
            Product updatedProduct = productRepository.save(product);
            logger.info("Product quantity decremented successfully: {}", updatedProduct);
            return ResponseEntity.ok(updatedProduct);
        } else {
            logger.error("Product quantity cannot be less than zero");
            return ResponseEntity.status(400).body(null);
        }
    } else {
        logger.error("Product with ID {} not found", id);
        return ResponseEntity.status(404).body(null);
    }
}

}
