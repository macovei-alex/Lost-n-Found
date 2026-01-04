package com.example.project.controllers;

import com.example.project.database.entities.Account;
import com.example.project.dtos.CreatePostDto;
import com.example.project.dtos.FullPostDto;
import com.example.project.dtos.PostDto;
import com.example.project.services.PostService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
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

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public FullPostDto createPost(@ModelAttribute @Valid CreatePostDto createPostDto) throws IOException {
        var account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return postService.createPost(createPostDto, account);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable int postId) {
        postService.deletePost(postId);
    }

}
