package com.example.project.dtos;

import com.example.project.database.entities.Coordinates;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoordinatesDto {
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;

    public CoordinatesDto(Coordinates embedded) {
        this.latitude = embedded.getLatitude();
        this.longitude = embedded.getLongitude();
    }
}
