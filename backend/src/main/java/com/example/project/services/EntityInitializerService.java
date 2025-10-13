package com.example.project.services;

import com.example.project.database.entities.Account;
import com.example.project.database.entities.ItemPost;
import com.example.project.database.entities.PostType;
import com.example.project.database.repositories.AccountRepository;
import com.example.project.database.repositories.ItemPostsRepository;
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
	private ItemPostsRepository itemPostsRepository;

	public static void reInitializeDatabase(EntityInitializerService entityInitializerService) {
		entityInitializerService.clearDatabase();

		log.info("Database cleared.");

		entityInitializerService.createAccounts();
		entityInitializerService.createItemPosts();

		log.info("Database initialized with sample data.");
	}

	@Transactional
	public void clearDatabase() {
		itemPostsRepository.deleteAll();
		accountRepository.deleteAll();
	}

	@Transactional
	public void createAccounts() {
		accountRepository.save(Account.builder()
				.itemPosts(List.of())
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

		itemPostsRepository.save(ItemPost.builder()
				.account(account)
				.postType(PostType.LOST)
				.title("Sample Item")
				.itemDescription("This is a sample item description.")
				.location("Sample Location")
				.createdAt(LocalDateTime.now())
				.build()
		);
	}
}
