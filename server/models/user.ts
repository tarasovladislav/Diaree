import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    diary_entries: {
        type: [],
        required: true
    },
    tags: {
        type: [],
        required: true
    },
    __v: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

export default User;
