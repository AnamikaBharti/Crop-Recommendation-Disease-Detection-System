 package com.cropapp.Service;

import com.cropapp.dto.CropRequest;
import com.cropapp.dto.CropResponse;
import com.cropapp.dto.DiseaseResponse;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class MLService {

    private final String PYTHON_API_URL = "http://127.0.0.1:5000";
    private final RestTemplate restTemplate = new RestTemplate();

    public CropResponse getCropRecommendation(CropRequest request) {
        String url = PYTHON_API_URL + "/predict";
        return restTemplate.postForObject(url, request, CropResponse.class);
    }

    public DiseaseResponse detectDisease(MultipartFile file) throws IOException {
        String url = PYTHON_API_URL + "/predict_disease";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        return restTemplate.postForObject(url, requestEntity, DiseaseResponse.class);
    }
}