 // 1. CORRECTED THE PACKAGE DECLARATION
package com.cropapp.Controller;

import com.cropapp.model.User;
import com.cropapp.repository.UserRepository;
import com.cropapp.dto.UserProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173") // Your frontend URL
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getCurrentUserProfile() {
        // This gets the user's email from the security context (via the token)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found for email: " + userEmail));

        // Build the response object without the 'area' field
        UserProfileResponse profile = UserProfileResponse.builder()
                .name(user.getName())
                .location(user.getLocation())
                .build();
        
        return ResponseEntity.ok(profile);
    }
}

