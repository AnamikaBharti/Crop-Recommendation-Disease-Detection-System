package com.cropapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception thrown when a user attempts to register with an email 
 * that already exists in the database.
 * Mapped to HTTP 409 Conflict status via @ResponseStatus.
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class UniqueEmailViolationException extends RuntimeException {

    public UniqueEmailViolationException(String message) {
        super(message);
    }
}