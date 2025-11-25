
package com.cropapp.Controller;

import com.cropapp.dto.CropRequest;
import com.cropapp.dto.CropResponse;
import com.cropapp.dto.DiseaseResponse;
import com.cropapp.Service.MLService;
import com.cropapp.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal; // 👈 IMPORT THIS

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PredictionController {

    @Autowired
    private MLService mlService;

    @Autowired
    private HistoryService historyService;

    @PostMapping("/recommend")
    // 👇 ADD Principal principal here
    public ResponseEntity<CropResponse> recommendCrop(@RequestBody CropRequest request, Principal principal) {
        CropResponse response = mlService.getCropRecommendation(request);

        // ✅ SAVE HISTORY (Only if user is logged in)
        if (principal != null) {
            String inputSummary = String.format("N:%d P:%d K:%d pH:%.1f", 
                request.getN(), request.getP(), request.getK(), request.getPh());
                
            String resultSummary = response.getTop_crops().isEmpty() ? "No Result" : 
                response.getTop_crops().get(0).getCrop();

            // Pass the username (principal.getName()) to your service
            historyService.saveHistory(principal.getName(), "CROP", inputSummary, resultSummary);
            System.out.println("✅ Crop history saved for: " + principal.getName());
        } else {
            System.out.println("⚠️ User not found. History NOT saved.");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/detect")
    // 👇 ADD Principal principal here
    public ResponseEntity<DiseaseResponse> detectDisease(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            DiseaseResponse response = mlService.detectDisease(file);

            // ✅ SAVE HISTORY (Only if user is logged in)
            if (principal != null) {
                String inputSummary = "Image: " + file.getOriginalFilename();
                String resultSummary = response.getDisease() + " (" + response.getConfidence() + ")";

                // Pass the username (principal.getName()) to your service
                historyService.saveHistory(principal.getName(), "DISEASE", inputSummary, resultSummary);
                System.out.println("✅ Disease history saved for: " + principal.getName());
            } else {
                System.out.println("⚠️ User not found. History NOT saved.");
            }

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}