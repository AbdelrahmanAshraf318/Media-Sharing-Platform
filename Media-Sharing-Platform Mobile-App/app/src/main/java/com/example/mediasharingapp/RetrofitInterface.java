package com.example.mediasharingapp;

import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface RetrofitInterface {

    @POST("api/login")
    Call<LoginResult> executeLogin(@Body HashMap<String, String> map);

    @POST("api/signup")
    Call<Void> executeSignUp(@Body HashMap<String, String> map);


    @GET("/api/media")
    Call<List<Media>> getMedia();


}
