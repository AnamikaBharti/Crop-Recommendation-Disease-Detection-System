package com.cropapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty; // Import this!
import lombok.Data;

@Data
public class CropRequest {

    // Force JSON to use Uppercase "N" instead of default lowercase "n"
    @JsonProperty("N")
    private int N;

    @JsonProperty("P")
    private int P;

    @JsonProperty("K")
    private int K;

    private double temperature;
    private double humidity;
    private double ph;
    private double rainfall;
}