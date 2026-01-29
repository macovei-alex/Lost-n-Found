package com.example.project.services;

import com.example.project.database.entities.*;
import com.example.project.database.repositories.AccountRepository;
import com.example.project.database.repositories.ChatRepository;
import com.example.project.database.repositories.PostImageRepository;
import com.example.project.database.repositories.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
@Slf4j
public class EntityInitializerService {

    private final PostImageRepository postImageRepository;
    private final AccountRepository accountRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder;
    private final ChatRepository chatRepository;


    public static void reInitializeDatabase(EntityInitializerService entityInitializerService) {
        entityInitializerService.clearDatabase();

        log.info("Database cleared.");

        entityInitializerService.createAccounts();
        entityInitializerService.createItemPosts();

        log.info("Database initialized with sample data.");
    }

    @Transactional
    public void clearDatabase() {
        postImageRepository.deleteAll();
        postRepository.deleteAll();
        chatRepository.deleteAll();
        accountRepository.deleteAll();
    }

    @Transactional
    public void createAccounts() {
        accountRepository.save(Account.builder()
                .posts(List.of())
                .chats(List.of())
                .name("John Doe")
                .email("test@email.com")
                .passwordHash(passwordEncoder.encode("test"))
                .phoneNumber("123 456 7890")
                .createdAt(LocalDateTime.now())
                .build()
        );
    }

    @Transactional
    public void createItemPosts() {
        var account = accountRepository.findAll().getFirst();

        Supplier<List<Post>> postsSupplier = () -> List.of(
                new Post(
                        null,
                        account,
                        List.of(),
                        PostType.LOST,
                        "Lost Student ID Card",
                        "Lost my student ID card somewhere near the main library. Please contact me if found.",
                        "Main Library, Campus",
                        new Coordinates(40.7128, -74.0060),
                        LocalDateTime.now().minusDays(2),
                        null,
                        "student_id.jpeg",
                        null
                ),
                new Post(
                        null,
                        account,
                        List.of(),
                        PostType.LOST,
                        "Lost Black Backpack",
                        "Black backpack with textbooks and a laptop. Lost around the cafeteria.",
                        "Campus Cafeteria",
                        new Coordinates(40.7138, -74.0070),
                        LocalDateTime.now().minusDays(1),
                        null,
                        "black_backpack.jpeg",
                        null
                ),
                new Post(
                        null,
                        account,
                        List.of(),
                        PostType.LOST,
                        "Lost Blue Fountain Pen",
                        "Lost a black fountain pen with gold trim. Last seen in lecture hall B during the morning class.",
                        "Lecture Hall B, Campus",
                        new Coordinates(-34.6037, -58.3816),
                        LocalDateTime.now().minusHours(5),
                        null,
                        "pen.jpeg",
                        "https://thursdayboots.com/products/mens-perfecto-backpack-black-matte-leather?srsltid=AfmBOorkbxItBTpn363KKtF2uD5_zv06FqNg-r0BE_VwD6rH75WDtoKa"
                )
        );

        final int times = 4;
        List<Post> duplicatedPosts = IntStream.range(0, times)
                .mapToObj(i -> postsSupplier.get())
                .flatMap(List::stream)
                .toList();

        postRepository.saveAll(duplicatedPosts);

        var postWithImages = new Post(
                null,
                account,
                List.of(),
                PostType.FOUND,
                "Found Laptop",
                "Found a blue laptop around the sports field. Looking for the owner.",
                "Sports Field, Campus",
                new Coordinates(24.123456, 54.123456),
                LocalDateTime.now(),
                null,
                "laptop.jpeg",
                "https://www.microsoft.com/en-us/surface/devices/surface-laptop"
        );
        postRepository.save(postWithImages);

        postImageRepository.save(PostImage.builder().post(postWithImages).imageName("laptop.jpeg").build());
        postImageRepository.save(PostImage.builder().post(postWithImages).imageName("laptop.jpeg").build());
    }
}
