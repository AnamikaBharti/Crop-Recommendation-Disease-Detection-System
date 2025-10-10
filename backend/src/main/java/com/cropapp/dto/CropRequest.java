// CropRecommendationRequest.java
package com.cropapp.dto;
import lombok.*;
@Data
public class CropRequest {
    private String soil;
    private String water;
    private String season;
    private String cropName;
}

