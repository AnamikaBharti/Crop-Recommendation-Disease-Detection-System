
// RecommendedCrop.java
package com.cropapp.dto;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class RecommendedCrop {
    private String name;
    private String rationale;
    private Double score;
}
