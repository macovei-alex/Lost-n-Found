package com.example.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MessageDTO {
    private Integer id;
    private Integer chatId;
    private Integer senderId;
    private String textContent;
    private boolean isRead;
    private LocalDateTime sentAt;
    private List<MessageImageDTO> images;
}