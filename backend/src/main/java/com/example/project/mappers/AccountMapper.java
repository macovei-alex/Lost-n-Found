package com.example.project.mappers;

import com.example.project.database.entities.Account;
import com.example.project.dtos.AccountDto;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

	public AccountDto fromEntity(Account entity) {
		if (entity == null) {
			return null;
		}

		return AccountDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.email(entity.getEmail())
				.phoneNumber(entity.getPhoneNumber())
				.createdAt(entity.getCreatedAt())
				.profileImageData(entity.getProfileImageData())
				.build();
	}

}
