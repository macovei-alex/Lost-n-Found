package com.example.project.controllers;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Chat;
import com.example.project.database.entities.Message;
import com.example.project.dtos.ChatDTO;
import com.example.project.dtos.MessageDTO;
import com.example.project.mappers.ChatMapper;
import com.example.project.services.ChatService;
import com.example.project.database.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final AccountRepository accountRepository;

    @GetMapping("/get-or-create")
    public ChatDTO getOrCreateChat(@RequestParam Integer account1Id,
                                   @RequestParam Integer account2Id) {

        Account account1 = accountRepository.findById(account1Id)
                .orElseThrow(() -> new RuntimeException("Account1 not found"));
        Account account2 = accountRepository.findById(account2Id)
                .orElseThrow(() -> new RuntimeException("Account2 not found"));

        Chat chat = chatService.getOrCreateChat(account1, account2);

        String otherUserName;
        if (account1Id.equals(account1.getId())) {
            otherUserName = account2.getDisplayName();
        } else {
            otherUserName = account1.getDisplayName();
        }

        return ChatMapper.toDTO(chat, otherUserName);
    }

    @PostMapping("/{chatId}/send")
    public MessageDTO sendMessage(@PathVariable Integer chatId,
                                  @RequestParam Integer senderId,
                                  @RequestParam String text) {

        Chat chat = chatService.getChatById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        Account sender = accountRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if (!sender.getId().equals(chat.getAccount1().getId()) &&
                !sender.getId().equals(chat.getAccount2().getId())) {
            throw new RuntimeException("Sender not part of this chat");
        }

        Message message = chatService.sendMessage(chat, sender, text);
        return ChatMapper.toDTO(message);
    }

    @GetMapping("/{chatId}/messages")
    public List<MessageDTO> getMessages(@PathVariable Integer chatId) {
        Chat chat = chatService.getChatById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
        return chatService.getMessages(chat).stream()
                .map(ChatMapper::toDTO)
                .toList();
    }

    @GetMapping("/my-chats")
    @Transactional
    public List<ChatDTO> getChatsForCurrentUser(@RequestParam Integer accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        return chatService.getChatsForAccount(account).stream()
                .map(chat -> {
                    String otherUserName;
                    if (chat.getAccount1().getId().equals(accountId)) {
                        otherUserName = chat.getAccount2().getDisplayName();
                    } else {
                        otherUserName = chat.getAccount1().getDisplayName();
                    }
                    return ChatMapper.toDTO(chat, otherUserName);
                })
                .toList();
    }
}