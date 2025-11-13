package com.example.project.mappers;

import com.example.project.database.entities.Post;
import com.example.project.dtos.PostDto;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

	public PostDto fromEntity(Post entity) {
		if (entity == null) {
			return null;
		}
		return PostDto.builder()
				.id(entity.getId())
				.idAccount(entity.getAccount().getId())
				.postType(entity.getPostType())
				.title(entity.getTitle())
				.itemDescription(entity.getItemDescription())
				.location(entity.getLocation())
				.createdAt(entity.getCreatedAt())
				.resolvedAt(entity.getResolvedAt())
				.mainImageName(entity.getMainImageName())
				.productLink(entity.getProductLink())
				.build();
	}

}
