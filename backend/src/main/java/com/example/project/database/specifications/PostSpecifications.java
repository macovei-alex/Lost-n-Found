package com.example.project.database.specifications;

import com.example.project.database.entities.Post;
import com.example.project.database.entities.PostType;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class PostSpecifications {

    public static Specification<Post> hasId(Integer id) {
        return (root, query, cb) -> cb.equal(root.get("id"), id);
    }

    public static Specification<Post> ownedBy(Integer accountId) {
        return (root, _, cb) -> cb.equal(root.get("account").get("id"), accountId);
    }

    public static Specification<Post> notOwnedBy(Integer accountId) {
        return (root, _, cb) -> cb.notEqual(root.get("account").get("id"), accountId);
    }

    public static Specification<Post> hasType(PostType postType) {
        return (root, _, cb) -> cb.equal(root.get("postType"), postType);
    }

    public static Specification<Post> isResolved() {
        return (root, _, cb) -> cb.isNotNull(root.get("resolvedAt"));
    }

    public static Specification<Post> isNotResolved() {
        return (root, _, cb) -> cb.isNull(root.get("resolvedAt"));
    }

    public static Specification<Post> fetchImages() {
        return (root, query, cb) -> {
            root.fetch("images", JoinType.LEFT);
            assert query != null;
            query.distinct(true);
            return cb.conjunction();
        };
    }
}