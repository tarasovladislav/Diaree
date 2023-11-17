import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    __v: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

export default User;
