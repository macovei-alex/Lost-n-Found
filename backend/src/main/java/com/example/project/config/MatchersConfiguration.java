package com.example.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
public class MatchersConfiguration {

    public final RequestMatcher PERMIT_ALL = new OrRequestMatcher(
            PathPatternRequestMatcher.withDefaults().matcher("/auth/**"),
            PathPatternRequestMatcher.withDefaults().matcher("/images/**"),
            PathPatternRequestMatcher.withDefaults().matcher("/health")
    );

}
