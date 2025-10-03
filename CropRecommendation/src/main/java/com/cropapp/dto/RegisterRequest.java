package com.cropapp.dto;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
