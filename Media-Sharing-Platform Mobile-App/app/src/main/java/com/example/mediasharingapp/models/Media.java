package com.example.mediasharingapp.models;

import com.google.gson.annotations.SerializedName;

public class Media {
    @SerializedName("_id")
    private String id;
    @SerializedName("url")
    private String url; // or binary data
    @SerializedName("type")
    private String type;
    @SerializedName("likes")
    private int likes;
    @SerializedName("dislikes")
    private int dislikes;


    public String getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getType() {
        return type;
    }

    public int getLikes() {
        return likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }
}
