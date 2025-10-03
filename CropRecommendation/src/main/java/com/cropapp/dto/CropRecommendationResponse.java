
package com.cropapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
 @NoArgsConstructor
  @AllArgsConstructor
public class CropRecommendationResponse {
    private String inputSummary;
    private List<RecommendedCrop> recommendations;
}