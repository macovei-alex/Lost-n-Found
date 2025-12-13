package com.example.project.dtos;

import com.example.project.database.entities.PostType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullPostDto {

    public record Image(int id, String name) {}

    private Integer id;
    private Integer idAccount;
    private PostType postType;
    private String title;
    private String itemDescription;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private String mainImageName;
    private List<Image> otherImages;
    private String productLink;

}
