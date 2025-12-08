package com.example.project.database.repositories;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByAccount1OrAccount2(Account account1, Account account2);
    Optional<Chat> findByAccount1AndAccount2(Account account1, Account account2);
    Optional<Chat> findByAccount2AndAccount1(Account account1, Account account2);
}