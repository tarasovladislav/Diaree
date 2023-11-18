import mongoose from "mongoose";
const diarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    tags: [
        {
            type: String,
        },
    ],
});

const Diary = mongoose.model("Diary", diarySchema);

export default Diary;
