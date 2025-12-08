package com.example.project.mappers;

import com.example.project.database.entities.Chat;
import com.example.project.database.entities.Message;
import com.example.project.database.entities.MessageImage;
import com.example.project.dtos.ChatDTO;
import com.example.project.dtos.MessageDTO;
import com.example.project.dtos.MessageImageDTO;

import java.util.stream.Collectors;

public class ChatMapper {

    public static ChatDTO toDTO(Chat chat) {
        return new ChatDTO(
                chat.getId(),
                chat.getAccount1().getId(),
                chat.getAccount2().getId(),
                chat.getCreatedAt()
        );
    }

    public static MessageDTO toDTO(Message message) {
        return new MessageDTO(
                message.getId(),
                message.getChat().getId(),
                message.getSender().getId(),
                message.getTextContent(),
                message.isRead(),
                message.getSentAt(),
                message.getImages().stream()
                        .map(ChatMapper::toDTO)
                        .collect(Collectors.toList())
        );
    }

    public static MessageImageDTO toDTO(MessageImage image) {
        return new MessageImageDTO(image.getId(), image.getImageName());
    }
}