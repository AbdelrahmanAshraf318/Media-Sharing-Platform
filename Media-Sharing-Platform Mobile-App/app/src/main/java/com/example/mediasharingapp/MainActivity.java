package com.example.mediasharingapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.example.mediasharingapp.media.UploadMediaActivity;
import com.example.mediasharingapp.models.LoginResult;
import com.example.mediasharingapp.service.RetrofitInterface;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = "http://10.0.2.2:4000";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);

        findViewById(R.id.login).setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        handleLoginDialog();
                    }
                }
        );

        findViewById(R.id.signup).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                handleSignupDialog();
            }
        });

    }

    private void handleLoginDialog() {

        View view = getLayoutInflater().inflate(R.layout.login_dialog, null);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(view).show();

        Button loginBtn = view.findViewById(R.id.login);
        EditText username = view.findViewById(R.id.username);
        EditText password = view.findViewById(R.id.password);

        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                HashMap<String, String> map = new HashMap<>();
                map.put("username", username.getText().toString());
                map.put("password", password.getText().toString());

                Call<LoginResult> call = retrofitInterface.executeLogin(map);

                call.enqueue(new Callback<LoginResult>() {
                    @Override
                    public void onResponse(Call<LoginResult> call, Response<LoginResult> response) {
                        if(response.code() == 200){
                            LoginResult result = response.body();
                            AlertDialog.Builder builder1 = new AlertDialog.Builder(MainActivity.this);
                            builder1.setTitle(result.getName());
                            builder1.setMessage(result.getEmail());
                            builder1.show();

                            Intent intent = new Intent(MainActivity.this, UploadMediaActivity.class);
                            startActivity(intent);

                            // Optional: finish MainActivity so user cannot return to login screen
                            finish();

                        }else if(response.code() == 404){
                            Toast.makeText(MainActivity.this,
                                    "Wrong User",
                                    Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResult> call, Throwable t) {
                        Toast.makeText(MainActivity.this, t.getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
            }
        });

    }

    private void handleSignupDialog(){

        View view = getLayoutInflater().inflate(R.layout.signup_dialog, null);

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(view).show();

        Button signupBtn = view.findViewById(R.id.signup);
        EditText name = view.findViewById(R.id.name);
        EditText email = view.findViewById(R.id.email);
        EditText password = view.findViewById(R.id.password);
        EditText username = view.findViewById(R.id.username);

        signupBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                HashMap<String, String> map = new HashMap<>();
                map.put("name", name.getText().toString());
                map.put("email", email.getText().toString());
                map.put("password", password.getText().toString());
                map.put("username", username.getText().toString());

                Call<Void> call = retrofitInterface.executeSignUp(map);
                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                            if(response.code() == 200){
                                Toast.makeText(MainActivity.this ,
                                        "Signed up successfully",
                                        Toast.LENGTH_LONG).show();

                                Intent intent = new Intent(MainActivity.this, UploadMediaActivity.class);
                                startActivity(intent);

                                // Optional: finish MainActivity so user cannot return to login screen
                                finish();
                            }else if(response.code() == 400){
                                Toast.makeText(MainActivity.this,
                                        "Aleardy Registered",
                                        Toast.LENGTH_LONG).show();
                            }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        Toast.makeText(MainActivity.this, t.getMessage(),
                                Toast.LENGTH_LONG).show();
                    }
                });
            }
        });

    }


}