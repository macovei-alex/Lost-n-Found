package com.example.project.mappers;

import com.example.project.database.entities.ItemPost;
import com.example.project.dtos.ItemPostDto;
import org.springframework.stereotype.Component;

@Component
public class ItemPostMapper {

	public ItemPostDto fromEntity(ItemPost entity) {
		if (entity == null) {
			return null;
		}
		return ItemPostDto.builder()
				.id(entity.getId())
				.title(entity.getTitle())
				.itemDescription(entity.getItemDescription())
				.location(entity.getLocation())
				.imageUrl(entity.getImageUrl())
				.postType(entity.getPostType())
				.createdAt(entity.getCreatedAt())
				.resolvedAt(entity.getResolvedAt())
				.imageUrl(entity.getImageUrl())
				.build();
	}

}
