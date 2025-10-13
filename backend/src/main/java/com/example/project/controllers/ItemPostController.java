package com.example.project.controllers;

import com.example.project.dtos.ItemPostDto;
import com.example.project.services.ItemPostService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
@AllArgsConstructor
public class ItemPostController {

	private final ItemPostService itemPostService;


	@GetMapping
	public List<ItemPostDto> getAllPaged(@RequestParam int page, @RequestParam int pageSize) {
		return itemPostService.getAllPaged(page, pageSize);
	}

}
