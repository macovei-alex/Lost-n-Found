package com.example.project.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AccountDto {

	private Integer id;
	private String name;
	private String email;
	private String phoneNumber;
	private LocalDateTime createdAt;
	private String profileImageName;
}
