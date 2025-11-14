package com.example.project.dtos;

import org.springframework.http.MediaType;

public record ImageDto(MediaType type, byte[] data) {
}
