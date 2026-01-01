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
	private String passwordHash;
	private String phoneNumber;
	private LocalDateTime createdAt;
	private String profileImageName;

    public AccountDto(Integer id, String email, String name, String profileImageName) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.profileImageName = profileImageName;
    }
}
