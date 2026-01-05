package com.example.project.database.specifications;

import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostType;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecifications {

    public static Specification<Post> ownedBy(Integer accountId) {
        return (root, _, cb) -> cb.equal(root.get("account").get("id"), accountId);
    }

    public static Specification<Post> hasType(PostType postType) {
        return (root, _, cb) -> cb.equal(root.get("postType"), postType);
    }

    public static Specification<Post> isResolved() {
        return (root, _, cb) -> cb.isNotNull(root.get("resolvedAt"));
    }
}