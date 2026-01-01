package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostImage;
import com.example.project.database.repositories.PostImageRepository;
import com.example.project.database.repositories.PostRepository;
import com.example.project.dtos.CreatePostDto;
import com.example.project.dtos.FullPostDto;
import com.example.project.dtos.ImageDto;
import com.example.project.dtos.PostDto;
import com.example.project.mappers.PostMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostMapper postMapper;
    private final ImageService imageService;


    public Page<PostDto> getAllPaged(int page, int pageSize) {
        return postRepository.findAllNotResolved(PageRequest.of(page, pageSize))
                       .map(postMapper::mapToSimplePostDto);
    }

    public FullPostDto getFullPost(int postId) {
        var optionalPost = postRepository.findByIdPreloadImages(postId);
        if (optionalPost.isEmpty()) {
            log.error("Post with id {} not found", postId);
            throw new EntityNotFoundException("Post with id " + postId + " not found");
        }

        var post = optionalPost.get();
        return postMapper.mapToFullPostDto(post);
    }

    @Transactional
    public FullPostDto createPost(CreatePostDto createPost, Account account) throws IOException {
        List<String> newImages = new ArrayList<>();

        MultipartFile mainImage = createPost.getMainImage();
        newImages.add(imageService.saveImage(new ImageDto(
                MediaType.parseMediaType(Objects.requireNonNull(mainImage.getContentType())),
                mainImage.getBytes()
        )));

        try {
            for (MultipartFile image : createPost.getOtherImages()) {
                newImages.add(imageService.saveImage(new ImageDto(
                        MediaType.parseMediaType(Objects.requireNonNull(image.getContentType())),
                        image.getBytes()
                )));
            }
        } catch (Exception e) {
            for (String newImage : newImages) {
                imageService.deleteImage(newImage);
            }
            throw e;
        }

        List<PostImage> postImages = new ArrayList<>();
        Post post = postMapper.mapToEntity(createPost, account, newImages.getFirst(), postImages);

        postImages.addAll(newImages.stream()
                                  .skip(1)
                                  .map((name) -> new PostImage(null, post, name))
                                  .toList()
        );

        postRepository.save(post);
        postImageRepository.saveAll(postImages);

        return postMapper.mapToFullPostDto(post);
    }

}
