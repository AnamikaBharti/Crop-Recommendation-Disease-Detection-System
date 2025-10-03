package com.cropapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInput {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   private String soil;
   private String season;
   private Double temp;
   private Double nitrogen;
   private Double phosphorus;
   private Double rainfall;
   private String image;
}
