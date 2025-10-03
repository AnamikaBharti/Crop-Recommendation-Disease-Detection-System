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
    user.setName(request.getName()); // set name from request
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);

    String token = jwtUtil.generateToken(user.getEmail());

    // Correct: match UserResponse(Long id, String name, String email, String token)
    return new UserResponse(user.getId(), user.getName(), user.getEmail(), token);
}
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // Match the constructor: UserResponse(Long id, String email, String token, String message)
        return new UserResponse(user.getId(), user.getEmail(), token, "Login successful");
    }
}
