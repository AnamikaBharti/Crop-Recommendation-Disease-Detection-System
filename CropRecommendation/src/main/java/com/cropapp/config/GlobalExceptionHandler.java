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
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage()));
            
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Handles custom email uniqueness violation
    @ExceptionHandler(UniqueEmailViolationException.class)
    public ResponseEntity<Object> handleUniqueEmailViolation(UniqueEmailViolationException ex, WebRequest request) {
        Map<String, String> error = Map.of("email", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
    
    // Handles runtime authentication errors (e.g., in AuthService)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeErrors(RuntimeException ex, WebRequest request) {
        // You would distinguish between Auth errors and other runtime errors
        if (ex.getMessage().contains("Invalid credentials")) {
            return new ResponseEntity<>(Map.of("error", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
        
        return new ResponseEntity<>(Map.of("error", "Internal server error: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // File/IO Exceptions for Disease Controller can be added here
    // @ExceptionHandler(IOException.class) ... 
}