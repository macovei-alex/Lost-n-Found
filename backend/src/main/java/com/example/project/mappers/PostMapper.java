package com.example.project.mappers;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostImage;
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
                .build();
    }

    public FullPostDto mapToFullPostDto(Post entity) {
        if (entity == null) {
            return null;
        }

        return FullPostDto.builder()
                .id(entity.getId())
                .idAccount(entity.getAccount().getId())
                .postType(entity.getPostType())
                .title(entity.getTitle())
                .itemDescription(entity.getItemDescription())
                .location(entity.getLocation())
                .createdAt(entity.getCreatedAt())
                .resolvedAt(entity.getResolvedAt())
                .mainImageName(entity.getMainImageName())
                .otherImages(entity.getImages()
                        .stream()
                        .map((image) -> new FullPostDto.Image(image.getId(), image.getImageName()))
                        .toList()
                )
                .productLink(entity.getProductLink())
                .build();
    }

    public Post mapToEntity(CreatePostDto createPostDto, Account account, String mainImageName, List<PostImage> postImages) {
        if (createPostDto == null) {
            return null;
        }
        return Post.builder()
                       .account(account)
                       .postType(createPostDto.getPostType())
                       .title(createPostDto.getTitle())
                       .itemDescription(createPostDto.getItemDescription())
                       .location(createPostDto.getLocation())
                       .mainImageName(mainImageName)
                       .productLink(createPostDto.getProductLink())
                       .createdAt(LocalDateTime.now())
                       .images(postImages)
                       .build();
    }

}
