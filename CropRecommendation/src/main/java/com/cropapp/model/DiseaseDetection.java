package com.cropapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiseaseDetection {
    @Id @GeneratedValue
    private Long id;
    private String filename;
    private String disease;
    private double confidence;
}
