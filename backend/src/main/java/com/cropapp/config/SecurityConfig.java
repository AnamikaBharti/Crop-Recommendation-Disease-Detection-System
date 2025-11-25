package com.cropapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.cropapp.util.JwtAuthEntryPoint;
import com.cropapp.util.JwtFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired 
    private JwtFilter jwtFilter;
    
    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //         .csrf(csrf -> csrf.disable())
    //         .cors(cors -> cors.configurationSource(corsConfigurationSource())) // FIXED: Use proper CORS
    //         .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
    //         .sessionManagement(session -> 
    //             session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //         .authorizeHttpRequests(auth -> auth
    //             .requestMatchers("/api/auth/**", "/h2-console/**").permitAll() // Allow H2 console
    //             .anyRequest().authenticated()
    //         );
        
    //     // Allow H2 console to work properly
    //     http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
        
    //     http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    //     return http.build();
    // }
@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 1. Allow Auth (Login/Register) & H2 Console
                .requestMatchers("/api/auth/**", "/h2-console/**").permitAll()
                
                // ✅ 2. ADD THIS LINE: Allow your ML Endpoints explicitly
                .requestMatchers("/api/recommend", "/api/detect").permitAll()
                
                // 3. Everything else requires a token
                .anyRequest().authenticated()
            );
        
        // Allow H2 console to work properly
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false); // FIXED: Set to false since we use Bearer tokens
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}