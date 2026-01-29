package com.example.project.dtos;

import com.example.project.database.entities.Coordinates;
import lombok.Data;

@Data
public class CoordinatesDto {
    private Double latitude;
    private Double longitude;

    public CoordinatesDto(Coordinates embedded) {
        this.latitude = embedded.getLatitude();
        this.longitude = embedded.getLongitude();
    }
}
