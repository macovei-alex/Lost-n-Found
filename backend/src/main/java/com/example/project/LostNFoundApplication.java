package com.example.project;

import com.example.project.services.EntityInitializerService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class LostNFoundApplication {

	@Value("${app.database.repopulate:false}")
	private String repopulateDatabase;


	public static void main(String[] args) {
		SpringApplication.run(LostNFoundApplication.class, args);
	}


	@Bean
	public CommandLineRunner reInitializeDatabase(EntityInitializerService entityInitializerService) {
		return (_) -> {
			if (repopulateDatabase.equals("true")) {
				EntityInitializerService.reInitializeDatabase(entityInitializerService);
			}
		};
	}

}
