package com.cropapp.Controller;

import com.cropapp.Service.DiseaseService;

import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/disease")
@CrossOrigin(origins = "${cors.allowedOrigins}")
public class DiseaseController {
    @Autowired
    private DiseaseService service;

    @PostMapping("/detect")
    public ResponseEntity<?> detect(@RequestParam("image") MultipartFile image) throws IOException {
        return ResponseEntity.ok(service.detect(image));
    }
}
