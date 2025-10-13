package com.example.project.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JoinColumn(name = "id_account", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Account account;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PostType postType;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, length = 1000)
	private String itemDescription;

	@Column(nullable = false)
	private String location;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	private LocalDateTime resolvedAt;

	private String imageUrl;

}
