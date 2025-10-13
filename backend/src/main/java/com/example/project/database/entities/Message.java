package com.example.project.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_chat", nullable = false)
	private Chat chat;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_sender", nullable = false)
	private Account sender;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false, columnDefinition = "BIT")
	private boolean isRead;

	@Column(nullable = false)
	private LocalDateTime sentAt;

}
