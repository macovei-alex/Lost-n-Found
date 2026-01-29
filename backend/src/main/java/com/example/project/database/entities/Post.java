package com.example.project.database.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_account", nullable = false)
	private Account account;

	@OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
	private List<PostImage> images;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PostType postType;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, length = 1000)
	private String itemDescription;

	@Column(nullable = false)
	private String location;

    @Embedded
    @Column(nullable = false)
    private Coordinates coordinates;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	private LocalDateTime resolvedAt;

	private String mainImageName;

	private String productLink;

}
