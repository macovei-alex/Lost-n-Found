package com.example.project.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterAccountDto {
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
}
