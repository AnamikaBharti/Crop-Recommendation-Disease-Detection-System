
package com.cropapp.dto;
import org.springframework.web.multipart.MultipartFile;

import lombok.*;
@Data
public class DiseaseRequest {
    private MultipartFile image;
}
