package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.repositories.AccountRepository;
import com.example.project.dtos.LoginAccountDto;
import com.example.project.dtos.RegisterAccountDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            AccountRepository accountRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account signup(RegisterAccountDto input) {
        if (accountRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new RuntimeException("Email already used");
        }

        Account user = new Account(
                input.getEmail(),
                input.getUsername(),
                passwordEncoder.encode(input.getPassword()),
                input.getPhoneNumber(),
                LocalDateTime.now()
        );
        return accountRepository.save(user);
    }

    public Account authenticate(LoginAccountDto input) {
        Account user = accountRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }
}
