import mongoose from "mongoose";


// Create the schema
const MediaSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        contentType: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

export const Media = mongoose.model("Media", MediaSchema)