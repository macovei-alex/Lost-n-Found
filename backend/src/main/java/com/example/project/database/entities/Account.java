package com.example.project.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@OneToMany(mappedBy = "account", fetch = FetchType.LAZY)
	private List<Post> posts;

	@OneToMany(fetch = FetchType.LAZY)
	private List<Chat> chats;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String passwordHash;

	@Column(nullable = false)
	private String phoneNumber;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	private byte[] profileImageData;

}
