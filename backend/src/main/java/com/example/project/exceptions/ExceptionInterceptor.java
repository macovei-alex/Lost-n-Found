package com.example.project.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Map;

@Slf4j
@ControllerAdvice
@AllArgsConstructor
public class ExceptionInterceptor {

    private final ExceptionResponseBuilder exceptionResponseBuilder;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception e, WebRequest request) {
        log.error("Unexpected error: {}", e.getMessage(), e);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        Map<String, Object> body = exceptionResponseBuilder.build(status, e.getMessage(), request);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEntityNotFoundException(Exception e, WebRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        Map<String, Object> body = exceptionResponseBuilder.build(status, e.getMessage(), request);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler({
            AuthenticationServiceException.class,
            ExpiredJwtException.class
    })
    public ResponseEntity<Map<String, Object>> handleAuthenticationServiceException(Exception e, WebRequest request) {
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        Map<String, Object> body = exceptionResponseBuilder.build(status, e.getMessage(), request);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            ValidationException.class,
    })
    public ResponseEntity<Map<String, Object>> handleValidationException(Exception e, WebRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        Map<String, Object> body = exceptionResponseBuilder.build(status, e.getMessage(), request);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxUploadSizeExceededException(Exception e, WebRequest request) {
        HttpStatus status = HttpStatus.PAYLOAD_TOO_LARGE;
        Map<String, Object> body = exceptionResponseBuilder.build(status, e.getMessage(), request);
        return new ResponseEntity<>(body, status);
    }
}
