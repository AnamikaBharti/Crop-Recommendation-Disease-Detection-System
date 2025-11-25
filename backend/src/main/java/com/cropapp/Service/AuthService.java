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
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Make sure you save the location if it's in the request!
        // user.setLocation(request.getLocation()); 
        
        user = userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        // ✅ FIXED: Added user.getLocation() to match the 5 fields in UserResponse
        return new UserResponse(
            user.getId(), 
            user.getName(), 
            user.getEmail(), 
            user.getLocation(), 
            token
        );
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // ✅ FIXED: Added user.getLocation() here too
        return new UserResponse(
            user.getId(), 
            user.getName(), 
            user.getEmail(), 
            user.getLocation(), 
            token
        );
    }
}