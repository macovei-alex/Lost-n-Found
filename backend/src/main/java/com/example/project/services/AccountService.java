package com.example.project.services;

import com.example.project.database.repositories.AccountRepository;
import com.example.project.dtos.AccountDto;
import com.example.project.mappers.AccountMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {

	private final AccountRepository accountRepository;
	private final AccountMapper accountMapper;


	public Optional<AccountDto> getById(Integer id) {
		return accountRepository.findById(id)
				.map(accountMapper::fromEntity);
	}

	public List<AccountDto> getAll() {
		return accountRepository.findAll()
				.stream()
				.map(accountMapper::fromEntity)
				.toList();
	}

}
