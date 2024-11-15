package com.example.mediasharingapp;

import android.os.Bundle;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

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
                    MediaAdapter adapter = new MediaAdapter(mediaList);
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

        public MediaAdapter(List<Media> mediaList) {
            this.mediaList = mediaList;
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
            Glide.with(holder.imageView.getContext()).load(new_url).diskCacheStrategy(DiskCacheStrategy.ALL).error("Image not Found").into(holder.imageView);

        }

        @Override
        public int getItemCount() {
            return mediaList.size();
        }

        public class MediaViewHolder extends RecyclerView.ViewHolder {
            ImageView imageView;

            public MediaViewHolder(View itemView) {
                super(itemView);
                imageView = itemView.findViewById(R.id.imageView);
            }
        }
    }
}