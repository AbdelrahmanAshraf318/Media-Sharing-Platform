package com.example.mediasharingapp.media;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.example.mediasharingapp.R;
import com.example.mediasharingapp.service.RetrofitInterface;
import com.example.mediasharingapp.models.Media;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import java.util.List;

public class MediaDashBoard extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_media_dash_board);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:4000")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        RetrofitInterface mediaApi = retrofit.create(RetrofitInterface.class);

        mediaApi.getMedia().enqueue(new Callback<List<Media>>() {
            @Override
            public void onResponse(Call<List<Media>> call, Response<List<Media>> response) {
                if (response.isSuccessful()) {
                    List<Media> mediaList = response.body();
                    MediaAdapter adapter = new MediaAdapter(mediaList, mediaApi); // Pass mediaApi to adapter
                    recyclerView.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<List<Media>> call, Throwable t) {
                t.printStackTrace();
            }
        });
    }

    public class MediaAdapter extends RecyclerView.Adapter<MediaAdapter.MediaViewHolder> {
        private final List<Media> mediaList;
        private final RetrofitInterface mediaApi;

        public MediaAdapter(List<Media> mediaList, RetrofitInterface mediaApi) {
            this.mediaList = mediaList;
            this.mediaApi = mediaApi;
        }

        @Override
        public MediaViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_media, parent, false);
            return new MediaViewHolder(view);
        }

        @Override
        public void onBindViewHolder(MediaViewHolder holder, int position) {
            String url = mediaList.get(position).getUrl();
            String new_url = "http://10.0.2.2:4000" + url;
            Log.i("MediaURL: ", url);

            Glide.with(holder.imageView.getContext())
                    .load(new_url)
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .error("Images Not Found")  // Replace with an actual placeholder image
                    .into(holder.imageView);

            int no_likes = mediaList.get(position).getLikes();
            int no_dilikes = mediaList.get(position).getDislikes();

            // Initialize like and dislike counters
            holder.likeCounter.setText(String.valueOf(no_likes));
            holder.dislikeCounter.setText(String.valueOf(no_dilikes));

            // Handle like button click
            holder.likeButton.setOnClickListener(v -> {

                Media mediaToUpdate = mediaList.get(position);
                mediaToUpdate.setLikes(no_likes + 1); // Update the likes count

                mediaApi.likeMedia(mediaList.get(position).getId(), mediaToUpdate).enqueue(new Callback<Media>() {

                    @Override
                    public void onResponse(Call<Media> call, Response<Media> response) {

                        if (response.isSuccessful() && response.body() != null) {
                            Media updatedMedia = response.body();
                            Log.i("Updated Media", "Likes: " + updatedMedia.getLikes() + ", Dislikes: " + updatedMedia.getDislikes());
                            holder.likeCounter.setText(String.valueOf(updatedMedia.getLikes()));
                            holder.dislikeCounter.setText(String.valueOf(updatedMedia.getDislikes()));
                        }
                    }

                    @Override
                    public void onFailure(Call<Media> call, Throwable t) {
                        Log.e("RetrofitError", "Error: " + t.getMessage());
                        t.printStackTrace();
                    }
                });
            });

            // Handle dislike button click
            holder.dislikeButton.setOnClickListener(v -> {
                Media mediaToUpdate = mediaList.get(position);
                mediaToUpdate.setDislikes(no_dilikes + 1); // Update the dislikes count

                mediaApi.dislikeMedia(mediaList.get(position).getId(), mediaToUpdate).enqueue(new Callback<Media>() {
                    @Override
                    public void onResponse(Call<Media> call, Response<Media> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            Media updatedMedia = response.body();
                            holder.likeCounter.setText(String.valueOf(updatedMedia.getLikes()));
                            holder.dislikeCounter.setText(String.valueOf(updatedMedia.getDislikes()));
                        }
                    }

                    @Override
                    public void onFailure(Call<Media> call, Throwable t) {
                        Log.e("RetrofitError", "Error: " + t.getMessage());
                        t.printStackTrace();
                    }
                });
            });
        }

        @Override
        public int getItemCount() {
            return mediaList.size();
        }

        public class MediaViewHolder extends RecyclerView.ViewHolder {
            ImageView imageView;
            Button likeButton, dislikeButton;
            TextView likeCounter, dislikeCounter;

            public MediaViewHolder(View itemView) {
                super(itemView);
                imageView = itemView.findViewById(R.id.imageView);
                likeButton = itemView.findViewById(R.id.likeButton);
                dislikeButton = itemView.findViewById(R.id.dislikeButton);
                likeCounter = itemView.findViewById(R.id.likeCounter);
                dislikeCounter = itemView.findViewById(R.id.dislikeCounter);
            }
        }
    }
}