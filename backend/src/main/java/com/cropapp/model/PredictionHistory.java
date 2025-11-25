package com.cropapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link to the logged-in user

    private String type; // "CROP" or "DISEASE"
    
    @Column(length = 1000) 
    private String inputDetails; // e.g., "N:90, P:40..." or "Image: leaf.jpg"

    @Column(length = 1000)
    private String result; // e.g., "Rice (99%)" or "Tomato Blight"

    private LocalDateTime timestamp;
}