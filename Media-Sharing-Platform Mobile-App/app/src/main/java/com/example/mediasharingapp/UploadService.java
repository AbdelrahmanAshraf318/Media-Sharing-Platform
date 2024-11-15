package com.example.mediasharingapp;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface UploadService {
    @Multipart
    @POST("/api/upload") // Replace with your actual endpoint
    Call<Void> uploadMedia(
            @Part MultipartBody.Part file,
            @Part("title") RequestBody title,
            @Part("description") RequestBody description
    );
}