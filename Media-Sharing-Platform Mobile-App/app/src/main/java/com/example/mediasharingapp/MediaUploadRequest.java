package com.example.mediasharingapp;

import java.io.File;

public class MediaUploadRequest {

    private String title;
    private File file;

    public MediaUploadRequest(File file) {
        //this.title = title;
        this.file = file;
    }

    public String getTitle() {
        return title;
    }

    public File getFile() {
        return file;
    }
}
