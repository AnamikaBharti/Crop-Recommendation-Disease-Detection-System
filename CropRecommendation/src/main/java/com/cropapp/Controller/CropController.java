package com.cropapp.Controller;

import com.cropapp.dto.CropRequest;
import com.cropapp.Service.CropService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "${cors.allowedOrigins}")
public class CropController {
    @Autowired private CropService service;

    @PostMapping("/recommend")
    public ResponseEntity<?> recommend(@RequestBody CropRequest req) {
        return ResponseEntity.ok(service.recommend(req));
    }
}
