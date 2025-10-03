// CropRecommendationRepository.java
package com.cropapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cropapp.model.CropRecommendation;

public interface CropRecommendationRepository extends JpaRepository<CropRecommendation, Long> {}
