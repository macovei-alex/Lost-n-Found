package com.example.project.helper;

import org.springframework.util.function.ThrowingSupplier;

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

}
