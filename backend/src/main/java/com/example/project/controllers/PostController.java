package com.example.project.controllers;

import com.example.project.dtos.FullPostDto;
import com.example.project.dtos.PostDto;
import com.example.project.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class PostController {

	private final PostService postService;


	@GetMapping
	public Page<PostDto> getAllPaged(@RequestParam int page, @RequestParam int pageSize) {
		return postService.getAllPaged(page, pageSize);
	}

    @GetMapping("/{postId}")
    public FullPostDto getFullPost(@PathVariable int postId) {
        return postService.getFullPost(postId);
    }

}
