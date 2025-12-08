package com.example.project.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_account_1", nullable = false)
	private Account account1;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_account_2", nullable = false)
	private Account account2;

	@Column(nullable = false)
	private LocalDateTime createdAt;
}
