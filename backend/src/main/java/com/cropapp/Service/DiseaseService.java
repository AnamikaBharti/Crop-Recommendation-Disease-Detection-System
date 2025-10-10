package com.cropapp.Service;

import com.cropapp.dto.ApiResponse;
import com.cropapp.model.DiseaseDetection;
import com.cropapp.repository.DiseaseDetectionRepository;

import java.io.IOException; // FIXED: Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DiseaseService {
    
    @Autowired 
    private DiseaseDetectionRepository repo;

    public ApiResponse detect(MultipartFile image) throws IOException {
        String filename = image.getOriginalFilename();
        // Mock detection - replace with actual ML model
        DiseaseDetection detection = new DiseaseDetection(
            null, 
            filename, 
            "Leaf Blight", 
            0.85
        );
        repo.save(detection);
        return new ApiResponse("Detection complete", detection);
    }
}