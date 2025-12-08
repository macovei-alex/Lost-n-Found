package com.example.project.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private Integer id;
    private Integer account1Id;
    private Integer account2Id;
    private LocalDateTime createdAt;
}