package com.example.project.database.repositories;

import com.example.project.database.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("""
            SELECT p FROM Post p
            WHERE p.resolvedAt is null
            ORDER BY p.createdAt DESC
            """)
    Page<Post> findAllNotResolved(Pageable pageable);

}
