package com.example.project.helper;

import org.springframework.http.MediaType;
import org.springframework.util.MimeType;

import java.util.Map;

public class MimeTypeUtils {

    private static final Map<String, String> MEDIA_TYPE_EXTENSIONS = Map.of(
            MediaType.IMAGE_JPEG_VALUE, ".jpg",
            MediaType.IMAGE_PNG_VALUE, ".png",
            MediaType.IMAGE_GIF_VALUE, ".gif",
            MediaType.APPLICATION_PDF_VALUE, ".pdf",
            MediaType.TEXT_PLAIN_VALUE, ".txt",
            MediaType.TEXT_HTML_VALUE, ".html"
    );

    public static String getExtension(MimeType mimeType) {
        if (!MEDIA_TYPE_EXTENSIONS.containsKey(mimeType.toString())) {
            throw new RuntimeException(mimeType + " is not a valid mime type");
        }
        return MEDIA_TYPE_EXTENSIONS.get(mimeType.toString());
    }

}
