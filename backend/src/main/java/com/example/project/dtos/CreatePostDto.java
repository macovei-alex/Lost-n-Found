package com.example.project.dtos;

import com.example.project.database.entities.PostType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreatePostDto {
    @NotNull
    private PostType postType;
    @NotBlank
    private String title;
    @NotBlank
    private String itemDescription;
    private String location;
    @NotBlank
    private String productLink;
    @NotNull
    private Double latitude;
    @NotNull
    private Double longitude;
    @NotNull
    private MultipartFile mainImage;
    private List<MultipartFile> otherImages = List.of();
}
