"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diarySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tag_1 = require("./tag");
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
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    tags: [tag_1.tagSchema],
});
exports.diarySchema = diarySchema;
// export default Diary;
