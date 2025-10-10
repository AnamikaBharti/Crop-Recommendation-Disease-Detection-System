package com.cropapp.Service;

import com.cropapp.dto.*;
import com.cropapp.model.CropRecommendation;
import com.cropapp.repository.CropRecommendationRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
@Service
public class CropService {
    @Autowired private CropRecommendationRepository repo;

    public ApiResponse recommend(CropRequest req) {
        String crop = switch (req.getSoil().toLowerCase()) {
            case "loamy" -> "Wheat";
            case "clayey" -> "Rice";
            case "sandy" -> "Millet";
            default -> "Unknown";
        };
        CropRecommendation rec = new CropRecommendation(null, req.getSoil(), req.getWater(), req.getSeason(), req.getCropName(), crop);
        repo.save(rec);
        return new ApiResponse("Recommendation complete", rec);
    }
}
