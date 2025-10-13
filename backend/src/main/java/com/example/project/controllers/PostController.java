package com.example.project.controllers;

import com.example.project.dtos.PostDto;
import com.example.project.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {

	private final PostService postService;


	@GetMapping
	public List<PostDto> getAllPaged(@RequestParam int page, @RequestParam int pageSize) {
		return postService.getAllPaged(page, pageSize);
	}

}
