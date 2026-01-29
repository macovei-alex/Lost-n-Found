package com.example.project.controllers;

import com.example.project.services.GoogleMapsApiService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.ServiceUnavailableException;

@RestController
@AllArgsConstructor
public class GeolocationController {

    private final GoogleMapsApiService googleMapsApiService;


    @GetMapping("/locations")
    public ResponseEntity<?> getAddress(
            @RequestParam(required = false) String address,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude
    ) throws ServiceUnavailableException {
        if (StringUtils.hasText(address)) {
            return ResponseEntity.ok(googleMapsApiService.getCoordinates(address));
        }
        else if (latitude != null && longitude != null) {
            return ResponseEntity.ok(googleMapsApiService.getAddress(latitude, longitude));
        }

        return ResponseEntity.badRequest()
                       .body("Either 'address' or both 'latitude' and 'longitude' must be provided as request parameters.");
    }

}