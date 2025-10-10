package com.cropapp.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.cropapp.exception.UniqueEmailViolationException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handles @Valid DTO validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex, WebRequest request) {
        
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            fieldErrors.put(error.getField(), error.getDefaultMessage())
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("error", "Validation failed");
        response.put("message", "Please check your input fields");
        response.put("fields", fieldErrors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Handles custom email uniqueness violation
    @ExceptionHandler(UniqueEmailViolationException.class)
    public ResponseEntity<Map<String, String>> handleUniqueEmailViolation(
            UniqueEmailViolationException ex, WebRequest request) {
        
        Map<String, String> response = new HashMap<>();
        response.put("error", "Email already exists");
        response.put("message", ex.getMessage());
        
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }
    
    // Handles runtime authentication errors (IMPROVED)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeErrors(
            RuntimeException ex, WebRequest request) {
        
        Map<String, String> response = new HashMap<>();
        
        // Check for specific authentication errors
        if (ex.getMessage().contains("Invalid credentials")) {
            response.put("error", "Authentication failed");
            response.put("message", "Invalid email or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        
        if (ex.getMessage().contains("Email already exists")) {
            response.put("error", "Registration failed");
            response.put("message", "Email address is already registered");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }
        
        // Generic runtime error
        response.put("error", "Internal server error");
        response.put("message", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle general exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(
            Exception ex, WebRequest request) {
        
        Map<String, String> response = new HashMap<>();
        response.put("error", "Server error");
        response.put("message", "An unexpected error occurred");
        
        // Log the full exception for debugging
        ex.printStackTrace();
        
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}