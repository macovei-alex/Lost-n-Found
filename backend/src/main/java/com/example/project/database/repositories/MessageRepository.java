package com.example.project.database.repositories;

import com.example.project.database.entities.Chat;
import com.example.project.database.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChatOrderBySentAtAsc(Chat chat);
}