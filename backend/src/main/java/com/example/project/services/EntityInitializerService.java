package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostType;
import com.example.project.database.repositories.AccountRepository;
import com.example.project.database.repositories.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class EntityInitializerService {

	private AccountRepository accountRepository;
	private PostRepository postRepository;

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
				.passwordHash("test")
				.phoneNumber("123 456 7890")
				.createdAt(LocalDateTime.now())
				.build()
		);
	}

	@Transactional
	public void createItemPosts() {
		var account = accountRepository.findAll().getFirst();

        Post post1 = Post.builder()
                .account(account)
                .postType(PostType.LOST)
                .title("Lost Student ID Card")
                .itemDescription("Lost my student ID card somewhere near the main library. Please contact me if found.")
                .location("Main Library, Campus")
                .createdAt(LocalDateTime.now().minusDays(2))
                .resolvedAt(null)
                .mainImageName("student_id.jpeg")
                .productLink(null)
                .build();

        Post post2 = Post.builder()
                .account(account)
                .postType(PostType.LOST)
                .title("Lost Black Backpack")
                .itemDescription("Black backpack with textbooks and a laptop. Lost around the cafeteria.")
                .location("Campus Cafeteria")
                .createdAt(LocalDateTime.now().minusDays(1))
                .resolvedAt(null)
                .mainImageName("black_backpack.jpeg")
                .productLink(null)
                .build();

        Post post3 = Post.builder()
                .account(account)
                .postType(PostType.FOUND)
                .title("Found Laptop")
                .itemDescription("Found a blue laptop around the sports field. Looking for the owner.")
                .location("Sports Field, Campus")
                .createdAt(LocalDateTime.now())
                .resolvedAt(null)
                .mainImageName("laptop.jpeg")
                .productLink(null)
                .build();

        Post post4 = Post.builder()
                .account(account)
                .postType(PostType.LOST)
                .title("Lost Blue Fountain Pen")
                .itemDescription("Lost a black fountain pen with gold trim. Last seen in lecture hall B during the morning class.")
                .location("Lecture Hall B, Campus")
                .createdAt(LocalDateTime.now().minusHours(5))
                .resolvedAt(null)
                .mainImageName("pen.jpg")
                .productLink("")
                .build();

        postRepository.saveAll(List.of(post1, post2, post3, post4));
	}
}
