package com.example.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {

	private Integer id;
	private String name;
	private String email;
	private String passwordHash;
	private String phoneNumber;
	private LocalDateTime createdAt;
	private byte[] profileImageData;

}
