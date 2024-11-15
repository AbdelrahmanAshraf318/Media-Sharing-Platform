package com.example.mediasharingapp;

import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface RetrofitInterface {

    @POST("api/login")
    Call<LoginResult> executeLogin(@Body HashMap<String, String> map);

    @POST("api/signup")
    Call<Void> executeSignUp(@Body HashMap<String, String> map);


    @GET("/api/media")
    Call<List<Media>> getMedia();

    @PUT("/api/like/{id}")
    @Headers("Content-Type: application/json")
    Call<Media> likeMedia(@Path("id") String mediaId, @Body Media mediaToUpdate);

    @PUT("/api/dislike/{id}")
    @Headers("Content-Type: application/json")
    Call<Media> dislikeMedia(@Path("id") String mediaId, @Body Media mediaToUpdate);


}
