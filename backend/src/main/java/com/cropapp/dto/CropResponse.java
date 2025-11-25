package com.cropapp.dto;
import lombok.Data;
import java.util.List;

@Data
public class CropResponse {
    private List<Recommendation> top_crops;

    @Data
    public static class Recommendation {
        private String crop;
        private String confidence;
    }
}