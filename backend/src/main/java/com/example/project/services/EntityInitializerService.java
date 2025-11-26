package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostType;
import com.example.project.database.repositories.AccountRepository;
import com.example.project.database.repositories.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private AccountRepository accountRepository;
    private PostRepository postRepository;
    private PasswordEncoder passwordEncoder;


    public static void reInitializeDatabase(EntityInitializerService entityInitializerService) {
        entityInitializerService.clearDatabase();

        log.info("Database cleared.");

        entityInitializerService.createAccounts();
        entityInitializerService.createItemPosts();

        log.info("Database initialized with sample data.");
    }

    @Transactional
    public void clearDatabase() {
        postRepository.deleteAll();
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
                Post.builder()
                        .account(account)
                        .postType(PostType.LOST)
                        .title("Lost Student ID Card")
                        .itemDescription("Lost my student ID card somewhere near the main library. Please contact me if found.")
                        .location("Main Library, Campus")
                        .createdAt(LocalDateTime.now().minusDays(2))
                        .resolvedAt(null)
                        .mainImageName("student_id.jpeg")
                        .productLink(null)
                        .build(),
                Post.builder()
                        .account(account)
                        .postType(PostType.LOST)
                        .title("Lost Black Backpack")
                        .itemDescription("Black backpack with textbooks and a laptop. Lost around the cafeteria.")
                        .location("Campus Cafeteria")
                        .createdAt(LocalDateTime.now().minusDays(1))
                        .resolvedAt(null)
                        .mainImageName("black_backpack.jpeg")
                        .productLink(null)
                        .build(),
                Post.builder()
                        .account(account)
                        .postType(PostType.FOUND)
                        .title("Found Laptop")
                        .itemDescription("Found a blue laptop around the sports field. Looking for the owner.")
                        .location("Sports Field, Campus")
                        .createdAt(LocalDateTime.now())
                        .resolvedAt(null)
                        .mainImageName("laptop.jpeg")
                        .productLink("https://www.microsoft.com/en-us/surface/devices/surface-laptop")
                        .build(),
                Post.builder()
                        .account(account)
                        .postType(PostType.LOST)
                        .title("Lost Blue Fountain Pen")
                        .itemDescription("Lost a black fountain pen with gold trim. Last seen in lecture hall B during the morning class.")
                        .location("Lecture Hall B, Campus")
                        .createdAt(LocalDateTime.now().minusHours(5))
                        .resolvedAt(null)
                        .mainImageName("pen.jpeg")
                        .productLink("https://thursdayboots.com/products/mens-perfecto-backpack-black-matte-leather?srsltid=AfmBOorkbxItBTpn363KKtF2uD5_zv06FqNg-r0BE_VwD6rH75WDtoKa")
                        .build()
        );

        final int times = 4;
        List<Post> duplicatedPosts = IntStream.range(0, times)
                .mapToObj(i -> postsSupplier.get())
                .flatMap(List::stream)
                .toList();

        postRepository.saveAll(duplicatedPosts);
    }
}
