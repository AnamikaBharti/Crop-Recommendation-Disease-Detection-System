package com.cropapp.Service;

import com.cropapp.dto.ApiResponse;
import com.cropapp.model.DiseaseDetection;
import com.cropapp.repository.DiseaseDetectionRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;
@Service
public class DiseaseService {
    @Autowired private DiseaseDetectionRepository repo;

    public ApiResponse detect(MultipartFile image) throws IOException {
        String filename = image.getOriginalFilename();
        DiseaseDetection detection = new DiseaseDetection(null, filename, "Leaf Blight", 0.85);
        repo.save(detection);
        return new ApiResponse("Detection complete", detection);
    }
}
