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
public class CropRecommendation {
    @Id @GeneratedValue
    private Long id;
    private String soil;
    private String water;
    private String season;
    private String cropName;
    private String recommendedCrop;
}
