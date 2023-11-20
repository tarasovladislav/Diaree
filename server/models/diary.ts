import mongoose from "mongoose";
import { tagSchema } from "./tag";

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
    tags: [tagSchema],
});

const Diary = mongoose.model("Diary", diarySchema);
export {diarySchema}
export default Diary;
