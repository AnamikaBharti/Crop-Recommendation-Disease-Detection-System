 package com.cropapp.Service;

import com.cropapp.model.PredictionHistory;
import com.cropapp.model.User;
import com.cropapp.repository.HistoryRepository;
import com.cropapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ UPDATED: Now accepts 'username' as an argument. 
    // This is much more reliable than trying to fetch it from SecurityContext inside the service.
    public void saveHistory(String username, String type, String input, String result) {
        
        // 1. Find User by Username (Email)
        // We use the username passed from the Controller
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + username));

        // 2. Build and Save History
        if (user != null) {
            PredictionHistory history = PredictionHistory.builder()
                    .user(user)
                    .type(type) // "CROP" or "DISEASE"
                    .inputDetails(input)
                    .result(result)
                    .timestamp(LocalDateTime.now())
                    .build();
            
            historyRepository.save(history);
            System.out.println("Saved history for user: " + username);
        }
    }

    // ✅ UPDATED: Helper to fetch history for a specific user (passed from Controller)
    public List<PredictionHistory> getUserHistory(String username) {
        User user = userRepository.findByEmail(username).orElse(null);
        
        if (user != null) {
            return historyRepository.findByUserIdOrderByTimestampDesc(user.getId());
        }
        return List.of(); // Return empty list if user not found
    }
}