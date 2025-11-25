package com.cropapp.dto;

import lombok.Data;

@Data
public class DiseaseResponse {
    private String disease;
    private String confidence;
    private String error; // In case Python sends an error
}