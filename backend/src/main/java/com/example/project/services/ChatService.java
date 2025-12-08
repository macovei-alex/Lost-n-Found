package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Chat;
import com.example.project.database.entities.Message;
import com.example.project.database.repositories.ChatRepository;
import com.example.project.database.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public Chat createChat(Account account1, Account account2) {
        Chat chat = new Chat();
        chat.setAccount1(account1);
        chat.setAccount2(account2);
        chat.setCreatedAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public List<Chat> getChatsForAccount(Account account) {
        return chatRepository.findByAccount1OrAccount2(account, account);
    }

    public Message sendMessage(Chat chat, Account sender, String textContent) {
        Message message = Message.builder()
                .chat(chat)
                .sender(sender)
                .textContent(textContent)
                .isRead(false)
                .sentAt(LocalDateTime.now())
                .build();
        return messageRepository.save(message);
    }

    public List<Message> getMessages(Chat chat) {
        return messageRepository.findByChatOrderBySentAtAsc(chat);
    }
}