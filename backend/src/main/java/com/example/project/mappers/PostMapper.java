package com.example.project.mappers;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Coordinates;
import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostImage;
import com.example.project.dtos.CoordinatesDto;
import com.example.project.dtos.CreatePostDto;
import com.example.project.dtos.FullPostDto;
import com.example.project.dtos.PostDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class PostMapper {

    public PostDto mapToSimplePostDto(Post entity) {
        if (entity == null) {
            return null;
        }
        return PostDto.builder()
                .id(entity.getId())
                .idAccount(entity.getAccount().getId())
                .postType(entity.getPostType())
                .title(entity.getTitle())
                .itemDescription(entity.getItemDescription())
                .location(entity.getLocation())
                .createdAt(entity.getCreatedAt())
                .resolvedAt(entity.getResolvedAt())
                .mainImageName(entity.getMainImageName())
                .productLink(entity.getProductLink())
                .coordinates(new CoordinatesDto(entity.getCoordinates()))
                .build();
    }

    public FullPostDto mapToFullPostDto(Post entity) {
        if (entity == null) {
            return null;
        }

        return new FullPostDto(
                entity.getId(),
                entity.getAccount().getId(),
                entity.getPostType(),
                entity.getTitle(),
                entity.getItemDescription(),
                entity.getLocation(),
                entity.getCreatedAt(),
                entity.getResolvedAt(),
                entity.getMainImageName(),
                entity.getImages()
                        .stream()
                        .map((image) -> new FullPostDto.Image(image.getId(), image.getImageName()))
                        .toList(),
                entity.getProductLink(),
                new CoordinatesDto(entity.getCoordinates())
        );
    }

    public Post mapToEntity(
            CreatePostDto createPostDto,
            Account account,
            String mainImageName,
            List<PostImage> postImages,
            Coordinates coordinates
    ) {
        if (createPostDto == null) {
            return null;
        }
        return new Post(
                null,
                account,
                postImages,
                createPostDto.getPostType(),
                createPostDto.getTitle(),
                createPostDto.getItemDescription(),
                createPostDto.getLocation(),
                coordinates,
                LocalDateTime.now(),
                null,
                mainImageName,
                createPostDto.getProductLink()
        );
    }

}
