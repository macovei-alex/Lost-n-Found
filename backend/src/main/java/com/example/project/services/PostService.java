package com.example.project.services;

import com.example.project.database.repositories.PostRepository;
import com.example.project.dtos.PostDto;
import com.example.project.mappers.PostMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final PostMapper postMapper;


	public Page<PostDto> getAllPaged(int page, int pageSize) {
		return postRepository.findAllNotResolved(PageRequest.of(page, pageSize))
				.map(postMapper::fromEntity);
	}

}
