package com.example.project.controllers;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Chat;
import com.example.project.database.entities.Message;
import com.example.project.dtos.ChatDTO;
import com.example.project.dtos.MessageDTO;
import com.example.project.mappers.ChatMapper;
import com.example.project.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/create")
    public Chat createChat(@RequestParam Integer account1Id, @RequestParam Integer account2Id) {
        Account account1 = new Account(); account1.setId(account1Id);
        Account account2 = new Account(); account2.setId(account2Id);
        return chatService.createChat(account1, account2);
    }

    @GetMapping
    public List<ChatDTO> getChats(@RequestParam Integer accountId) {
        Account account = new Account();
        account.setId(accountId);
        return chatService.getChatsForAccount(account).stream()
                .map(ChatMapper::toDTO)
                .toList();
    }

    @GetMapping("/{chatId}/messages")
    public List<MessageDTO> getMessages(@PathVariable Integer chatId) {
        Chat chat = new Chat();
        chat.setId(chatId);
        return chatService.getMessages(chat).stream()
                .map(ChatMapper::toDTO)
                .toList();
    }

    @PostMapping("/{chatId}/send")
    public MessageDTO sendMessage(
            @PathVariable Integer chatId,
            @RequestParam Integer senderId,
            @RequestParam String text
    ) {
        Chat chat = new Chat(); chat.setId(chatId);
        Account sender = new Account(); sender.setId(senderId);
        Message message = chatService.sendMessage(chat, sender, text);
        return ChatMapper.toDTO(message);
    }

    @GetMapping("/get-or-create")
    public ChatDTO getOrCreateChat(
            @RequestParam Integer account1Id,
            @RequestParam Integer account2Id
    ) {
        Account account1 = new Account(); account1.setId(account1Id);
        Account account2 = new Account(); account2.setId(account2Id);
        Chat chat = chatService.getOrCreateChat(account1, account2);
        return ChatMapper.toDTO(chat);
    }
}