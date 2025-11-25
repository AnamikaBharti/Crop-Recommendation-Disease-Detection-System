package com.cropapp.repository;
import com.cropapp.model.PredictionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<PredictionHistory, Long> {
    // Fetch history for a specific user, newest first
    List<PredictionHistory> findByUserIdOrderByTimestampDesc(Long userId);
}