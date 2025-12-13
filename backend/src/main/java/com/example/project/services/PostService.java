package com.example.project.services;

import com.example.project.database.repositories.PostRepository;
import com.example.project.dtos.FullPostDto;
import com.example.project.dtos.PostDto;
import com.example.project.mappers.PostMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final PostMapper postMapper;


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

}
