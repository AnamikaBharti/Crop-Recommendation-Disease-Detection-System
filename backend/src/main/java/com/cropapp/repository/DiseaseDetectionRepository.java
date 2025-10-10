package com.cropapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;

// ... imports
import com.cropapp.model.DiseaseDetection;
public interface DiseaseDetectionRepository extends JpaRepository<DiseaseDetection, Long> {}
