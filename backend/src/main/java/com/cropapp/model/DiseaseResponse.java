package com.cropapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiseaseResponse {
    private String disease;
    private String confidence;
}
