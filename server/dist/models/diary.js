"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const diarySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: false,
    },
    date: {
        // type: Date,
        type: String,
        required: true,
        // set: (value: Date) => {
        //     if (value instanceof Date) {
        //         value.setHours(0, 0, 0, 0);
        //         return value;
        //     }
        //     return value;
        // },
    },
    // createdAt: {
    //     type: Date,
    //     default: () => Date.now()
    //     // default: () => new Date(Date.now() + 60 * 60 * 1000),
    // },
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
// TODO DONE made default instead 
// diarySchema.pre("save", function (next) {
//     this.updatedAt = Date.now();
//     next();
// });
const Diary = mongoose_1.default.model("Diary", diarySchema);
exports.default = Diary;
