const mongoose = require("mongoose");

const user_schema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Name is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8
        },

        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            minlength: 8
        },
    },

    {
        timestamps: true
    }


);

const user = mongoose.model("User", user_schema);

module.exports = user;