package com.cropapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder; 

@Data
@Builder
@NoArgsConstructor
 @AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String location;
    private String token;
}