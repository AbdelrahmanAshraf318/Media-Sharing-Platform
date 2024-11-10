import mongoose from "mongoose";


// Create the schema
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: 8,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model("User", UserSchema)