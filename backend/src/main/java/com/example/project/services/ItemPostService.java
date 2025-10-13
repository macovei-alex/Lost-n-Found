package com.example.project.services;

import com.example.project.database.repositories.ItemPostRepository;
import com.example.project.dtos.ItemPostDto;
import com.example.project.mappers.ItemPostMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemPostService {

	private final ItemPostRepository itemPostRepository;
	private final ItemPostMapper itemPostMapper;


	public List<ItemPostDto> getAllPaged(int page, int pageSize) {
		return itemPostRepository.findAll(PageRequest.of(page, pageSize))
				.stream()
				.map(itemPostMapper::fromEntity)
				.toList();
	}

}
