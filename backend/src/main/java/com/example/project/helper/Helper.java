package com.example.project.helper;

import org.springframework.util.function.ThrowingSupplier;

import java.net.URI;

public class Helper {

    public static <T> T tryCatch(ThrowingSupplier<T> supplier) {
        try {
            return supplier.getWithException();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> T tryCatch(ThrowingSupplier<T> supplier, T defaultValue) {
        try {
            return supplier.getWithException();
        } catch (Exception e) {
            return defaultValue;
        }
    }

    public static boolean isUrl(String url) {
        try {
            new URI(url);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
