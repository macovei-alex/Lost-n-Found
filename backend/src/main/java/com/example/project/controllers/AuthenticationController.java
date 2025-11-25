package com.example.project.controllers;

import com.example.project.database.entities.Account;
import com.example.project.dtos.LoginAccountDto;
import com.example.project.dtos.RegisterAccountDto;
import com.example.project.responses.LoginResponse;
import com.example.project.services.AuthenticationService;
import com.example.project.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Account> register(@RequestBody RegisterAccountDto registerAccountDto) {
        Account registeredAccount = authenticationService.signup(registerAccountDto);
        return ResponseEntity.ok(registeredAccount);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginAccountDto loginAccountDto){
        Account authenticatedAccount = authenticationService.authenticate(loginAccountDto);
        String jwtToken = jwtService.generateToken(authenticatedAccount);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }
}
