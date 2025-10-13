package com.example.project.services;

import com.example.project.database.repositories.PostRepository;
import com.example.project.dtos.PostDto;
import com.example.project.mappers.PostMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final PostMapper postMapper;


	public List<PostDto> getAllPaged(int page, int pageSize) {
		return postRepository.findAll(PageRequest.of(page, pageSize))
				.stream()
				.map(postMapper::fromEntity)
				.toList();
	}

}
