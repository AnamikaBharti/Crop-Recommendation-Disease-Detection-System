package com.cropapp.Service;

import com.cropapp.dto.LoginRequest;
import com.cropapp.dto.RegisterRequest;
import com.cropapp.dto.UserResponse;
import com.cropapp.model.User;
import com.cropapp.repository.UserRepository;
import com.cropapp.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Save user to database
        user = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return response with consistent constructor
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), token);
    }

    public UserResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return response with consistent constructor (FIXED)
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), token);
    }
}