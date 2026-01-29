package com.example.project.services;

import com.example.project.database.entities.*;
import com.example.project.database.repositories.PostImageRepository;
import com.example.project.database.repositories.PostRepository;
import com.example.project.database.specifications.PostSpecifications;
import com.example.project.dtos.*;
import com.example.project.mappers.PostMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.ServiceUnavailableException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final PostMapper postMapper;
    private final ImageService imageService;
    private final GoogleMapsApiService googleMapsApiService;


    public Page<PostDto> getActivePaged(int page, int pageSize) {
        var spec = PostSpecifications.isNotResolved();
        var pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        return postRepository.findAll(spec, pageable).map(postMapper::mapToSimplePostDto);
    }

    public Page<PostDto> getAllMyPostsPaged(int page, int pageSize, Optional<PostType> postType, Optional<Boolean> resolved) {
        var account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var spec = PostSpecifications.ownedBy(account.getId());
        if (postType.isPresent()) {
            spec = spec.and(PostSpecifications.hasType(postType.get()));
        }
        if (resolved.isPresent() && resolved.get()) {
            spec = spec.and(PostSpecifications.isResolved());
        }

        var pageable = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.DESC, "createdAt"));

        return postRepository.findAll(spec, pageable)
                .map(postMapper::mapToSimplePostDto);
    }

    public FullPostDto getFullPost(int postId) {
        var spec = PostSpecifications.hasId(postId)
                .and(PostSpecifications.fetchImages());
        var posts = postRepository.findAll(spec);
        if (posts.isEmpty()) {
            throw new EntityNotFoundException("Post with id " + postId + " not found");
        }
        assert posts.size() == 1;
        var post =  posts.getFirst();

        return postMapper.mapToFullPostDto(post);
    }

    @Transactional
    public FullPostDto createPost(CreatePostDto createPost, Account account) throws IOException, ServiceUnavailableException {
        var googleMapsCoordinates = googleMapsApiService.getCoordinates(createPost.getLocation());

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
        Post post = postMapper.mapToEntity(
                createPost,
                account,
                newImages.getFirst(),
                postImages,
                new Coordinates(googleMapsCoordinates.getLatitude(), googleMapsCoordinates.getLongitude())
        );

        postImages.addAll(newImages.stream()
                .skip(1)
                .map((name) -> new PostImage(null, post, name))
                .toList()
        );

        postRepository.save(post);
        postImageRepository.saveAll(postImages);

        return postMapper.mapToFullPostDto(post);
    }

    public void deletePost(int postId) {
        var spec = PostSpecifications.hasId(postId)
                .and(PostSpecifications.fetchImages());
        var post = postRepository.findOne(spec)
                .orElseThrow(() -> new EntityNotFoundException("Post with id " + postId + " not found"));
        postRepository.deleteById(post.getId());
        for (PostImage postImage : post.getImages()) {
            imageService.deleteImage(postImage.getImageName());
        }
    }

    @Transactional
    public FullPostDto resolvePost(int postId) {
        var post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post with id " + postId + " not found"));
        post.setResolvedAt(LocalDateTime.now());
        return postMapper.mapToFullPostDto(post);
    }

}
