package com.example.project.services;

import com.example.project.dtos.ImageDto;
import com.example.project.helper.Helper;
import com.example.project.helper.MimeTypeUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

@Slf4j
@Service
public class ImageService {

    private final String folderPath;

    public ImageService(@Value("${app.images.folder-path}") String folderPath) {
        this.folderPath = folderPath;
    }


    public ImageDto loadImage(String imageName) throws FileNotFoundException {
        Path path = Path.of(folderPath, imageName);
        if (Files.notExists(path)) {
            log.error("Image {} could not be found", imageName);
            throw new FileNotFoundException("Image " + imageName + " could not be found");
        }

        String contentType = Helper.tryCatch(() -> Files.probeContentType(path));
        MediaType mediaType = MediaType.parseMediaType(contentType);

        try {
            var bytes = Files.readAllBytes(path);
            return new ImageDto(mediaType, bytes);
        } catch (IOException e) {
            log.error("An error occurred while trying to read image {}", imageName, e);
            throw new RuntimeException("An unexpected error occurred while trying to read image " + imageName, e);
        }
    }


    public boolean imageExists(String imageName) {
        return Files.exists(Path.of(folderPath, imageName));
    }


    public String saveImage(ImageDto imageDto) {
        int stepCount = 0;
        while (stepCount < 3) {
            try {
                String imageName = UUID.randomUUID() + MimeTypeUtils.getExtension(imageDto.type());
                Path path = Path.of(folderPath, imageName);

                Files.write(path, imageDto.data(), StandardOpenOption.CREATE_NEW);

                log.info("Image {} saved successfully", imageName);
                return imageName;

            } catch (FileAlreadyExistsException e) {
                log.warn("UUID collision detected, retrying saveImage", e);
                stepCount++;
            } catch (IOException e) {
                log.error("An error occurred while trying to write image", e);
                throw new RuntimeException("Failed to save image", e);
            }
        }

        throw new RuntimeException("Too many UUID collisions when attempting to save image");
    }


    public boolean deleteImage(String imageName) {
        Path path = Path.of(folderPath, imageName);
        try {
            boolean deleted = Files.deleteIfExists(path);
            if (deleted) {
                log.info("Image {} deleted successfully", imageName);
            } else {
                log.warn("Image {} not found for deletion", imageName);
            }
            return deleted;
        } catch (IOException e) {
            log.error("Failed to delete image {}", imageName, e);
            throw new RuntimeException("Failed to delete image " + imageName, e);
        }
    }
}
