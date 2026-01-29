package com.example.project.services;

import com.example.project.dtos.GoogleApiGeocode;
import com.example.project.dtos.GoogleApiCoordinates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import javax.naming.ServiceUnavailableException;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;

@Service
public class GoogleMapsApiService {

    private final RestClient restClient;
    private final String apiKey;


    public GoogleMapsApiService(@Value("${google.maps.api-key}") String apiKey) {
        assertNotNull(apiKey);

        this.apiKey = apiKey;
        this.restClient = RestClient.builder()
                                  .baseUrl("https://maps.googleapis.com/maps/api")
                                  .build();
    }


    public String getAddress(double latitude, double longitude) throws ServiceUnavailableException {
        String uri = UriComponentsBuilder.fromUriString("/geocode/json")
                             .queryParam("latlng", latitude + "," + longitude)
                             .queryParam("key", apiKey)
                             .build()
                             .toUriString();

        try {
            var response = restClient.get()
                                   .uri(uri)
                                   .retrieve()
                                   .body(GoogleApiGeocode.class);

            throwIfInvalid(response);

            return response.getResults().getFirst().getFormattedAddress();
        } catch (ResourceAccessException e) {
            throw new ServiceUnavailableException("Google maps API service is unavailable: " + e.getMessage());
        }
    }


    public GoogleApiCoordinates getCoordinates(String address) throws ServiceUnavailableException {
        String uri = UriComponentsBuilder.fromUriString("/geocode/json")
                             .queryParam("address", address)
                             .queryParam("key", apiKey)
                             .build()
                             .toUriString();

        try {
            var response = restClient.get()
                                   .uri(uri)
                                   .retrieve()
                                   .body(GoogleApiGeocode.class);

            throwIfInvalid(response);

            return response.getResults().getFirst().getGeometry().getLocation();
        } catch (ResourceAccessException e) {
            throw new ServiceUnavailableException("Google maps API service is unavailable: " + e.getMessage());
        }
    }


    private void throwIfInvalid(GoogleApiGeocode response) throws ServiceUnavailableException {
        if (response == null) {
            throw new ServiceUnavailableException("Google Maps Geocode Api service is unavailable");
        } else if (response.getStatus() == null) {
            throw new InternalError("Something went wrong with the Google Maps Geocode API request. No status was returned. Check for DTO schema changes.");
        } else if (response.getStatus().equals("ZERO_RESULTS")) {
            throw new IllegalArgumentException("Address not found");
        } else if (response.getStatus().equals("REQUEST_DENIED")) {
            throw new InternalError("The Google Maps Geocode API request was denied with the following message: "
                                            + response.getErrorMessage()
            );
        }
    }
}
