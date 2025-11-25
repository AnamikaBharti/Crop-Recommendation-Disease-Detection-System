package com.cropapp.Controller;

import com.cropapp.model.PredictionHistory;
import com.cropapp.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal; 
import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping
    // ✅ 2. Add 'Principal principal' here
    public ResponseEntity<List<PredictionHistory>> getMyHistory(Principal principal) {
        
        if (principal == null) {
            // Handle case where user is not logged in (or token invalid)
            return ResponseEntity.status(401).build(); 
        }

        // ✅ 3. Pass the actual username instead of null
        return ResponseEntity.ok(historyService.getUserHistory(principal.getName()));
    }
}