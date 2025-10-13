package com.example.project.dtos;

import com.example.project.database.entities.PostType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemPostDto {

	private Integer id;
	private Integer idAccount;
	private PostType postType;
	private String title;
	private String itemDescription;
	private String location;
	private LocalDateTime createdAt;
	private LocalDateTime resolvedAt;
	private String imageUrl;

}
