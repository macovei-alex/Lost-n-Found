package com.example.project.controllers;

import com.example.project.dtos.AccountDto;
import com.example.project.services.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@AllArgsConstructor
public class AccountController {

	private final AccountService accountService;


	@GetMapping("/{id}")
	public ResponseEntity<AccountDto> getAccountById(@PathVariable Integer id) {
		return accountService.getById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<AccountDto> getAllAccounts() {
		return accountService.getAll();
	}

}
