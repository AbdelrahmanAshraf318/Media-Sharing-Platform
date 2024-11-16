package com.example.mediasharingapp;


import android.Manifest;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.bumptech.glide.Glide;

import java.io.File;
import java.io.InputStream;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UploadMediaActivity extends AppCompatActivity {
    private static final int PICK_IMAGE_REQUEST = 1;
    private static final int STORAGE_PERMISSION_CODE = 1;

    private ImageView selectedImageView;
    private Button uploadButton;
    private Button selectImageButton;
    private Uri selectedImageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_upload_media);

        selectedImageView = findViewById(R.id.selectedImageView);
        uploadButton = findViewById(R.id.uploadButton);
        selectImageButton = findViewById(R.id.selectImageButton);

        // Check and request permission for storage access
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, STORAGE_PERMISSION_CODE);
        }

        // Open image chooser on button click
        selectImageButton.setOnClickListener(v -> openImageChooser());

        // Handle upload button click
        uploadButton.setOnClickListener(v -> {
            if (selectedImageUri != null) {
                uploadMedia();
            } else {
                Toast.makeText(this, "Please select an image", Toast.LENGTH_SHORT).show();
            }
        });
    }

    // Open file chooser for image/video selection
    private void openImageChooser() {
        Intent intent = new Intent();
        intent.setType("image/* video/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select Image"), PICK_IMAGE_REQUEST);
    }

    // Handle image selection result
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @NonNull Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            selectedImageUri = data.getData();
            Glide.with(this).load(selectedImageUri).into(selectedImageView);

            // Handle the selected URI (e.g., upload)
            handleFileInputStream(selectedImageUri);
        }
    }

    // Open an InputStream from the URI and prepare it for upload
    private void handleFileInputStream(Uri uri) {
        ContentResolver contentResolver = getContentResolver();
        try (InputStream inputStream = contentResolver.openInputStream(uri)) {
            if (inputStream != null) {
                // Proceed to upload the file via Retrofit
                uploadMediaWithStream(inputStream);
            } else {
                Log.e("UploadMedia", "Failed to open InputStream");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("UploadMedia", "Error: " + e.getMessage());
        }
    }

    // Upload the media using InputStream
    private void uploadMediaWithStream(InputStream inputStream) {
        try {
            // Convert the InputStream to a byte array
            byte[] buffer = new byte[inputStream.available()];
            inputStream.read(buffer);

            // Create RequestBody with MediaType and byte array
            RequestBody requestFile = RequestBody.create(MediaType.parse("multipart/form-data"), buffer);
            MultipartBody.Part body = MultipartBody.Part.createFormData("media", "media", requestFile);

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl("http://10.0.2.2:4000")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            RetrofitInterface apiService = retrofit.create(RetrofitInterface.class);

            // Start the upload request
            apiService.uploadMedia(body).enqueue(new Callback<Void>() {
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(UploadMediaActivity.this, "Media uploaded successfully!", Toast.LENGTH_SHORT).show();
                        finish();
                    } else {
                        Log.e("UploadMedia", "Upload failed: " + response.message());
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    Toast.makeText(UploadMediaActivity.this, "Upload failed: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    Log.e("UploadMedia", "Error: " + t.getMessage());
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("UploadMedia", "Error: " + e.getMessage());
        }
    }

    // Handle permission result for storage access
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == STORAGE_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Storage permission granted!", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Permission denied. Cannot access files.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void uploadMedia() {
        // Check if the selected image URI is not null
        if (selectedImageUri != null) {
            ContentResolver contentResolver = getContentResolver();
            try (InputStream inputStream = contentResolver.openInputStream(selectedImageUri)) {
                if (inputStream != null) {
                    // Proceed with the file upload using Retrofit
                    uploadMediaWithStream(inputStream);
                } else {
                    Log.e("UploadMedia", "Failed to open InputStream");
                    Toast.makeText(this, "Failed to open file", Toast.LENGTH_SHORT).show();
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("UploadMedia", "Error: " + e.getMessage());
            }
        } else {
            Toast.makeText(this, "Please select an image", Toast.LENGTH_SHORT).show();
        }
    }
}