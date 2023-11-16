"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO remove unused libraries redundant
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const diary_js_1 = __importDefault(require("../models/diary.js"));
async function getAllDiaryEntries(req, res) {
    try {
        const allDiaryEntries = await diary_js_1.default.find();
        res.status(200).json(allDiaryEntries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getRecentDiaryEntries(req, res) {
    try {
        const recentDiaryEntries = await diary_js_1.default.find({}).sort({ date: -1 }).limit(3);
        res.status(200).json(recentDiaryEntries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getDiaryEntryById(req, res) {
    try {
        const { id } = req.params;
        const oneDiaryEntry = await diary_js_1.default.findById(id);
        if (!oneDiaryEntry) {
            res.status(404).json({ message: "Diary entry not found" });
        }
        res.status(200).json(oneDiaryEntry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getDiaryEntryByDate(req, res) {
    try {
        const { date } = req.params;
        const foundDiaryEntry = await diary_js_1.default.findOne({ date }).exec();
        if (!foundDiaryEntry) {
            return res
                .status(404)
                .json({ message: "No diary entry found for the date" });
        }
        res.status(200).json(foundDiaryEntry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function postDiaryEntry(req, res) {
    try {
        const { title, text, date, imageUrl, tags } = req.body;
        const diaryEntryToAdd = await diary_js_1.default.create({
            title,
            text,
            date,
            imageUrl,
            tags,
        });
        res.status(201).json(diaryEntryToAdd);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadImage(req, res) {
    try {
        console.log("Received image upload request");
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
        }
        else {
            const result = await cloudinary_1.v2.uploader.upload(req.file.path, {
                width: 500,
                height: 500,
                crop: "fit",
                gravity: "center",
                quality: "auto",
                fetch_format: "auto",
            });
            const imageUrl = result.url;
            res.json({ imageUrl });
        }
    }
    catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
}
async function putDiaryEntry(req, res) {
    try {
        const { id } = req.params;
        const { title, text, date, imageUrl, tags } = req.body; // Include tags
        const updatedDiaryEntry = await diary_js_1.default.findByIdAndUpdate(id, {
            title,
            text,
            date,
            imageUrl,
            tags,
        }, {
            new: true,
        });
        if (!updatedDiaryEntry) {
            res.status(404).json({ message: "Diary entry not found" });
        }
        res.status(200).json(updatedDiaryEntry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function deleteDiaryEntry(req, res) {
    try {
        const { id } = req.params;
        const deletedEntry = await diary_js_1.default.findByIdAndDelete(id);
        if (!deletedEntry) {
            res.status(404).json({ message: "Diary entry not found" });
        }
        res.status(200).json({ message: "Diary entry deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
exports.default = {
    getAllDiaryEntries,
    getRecentDiaryEntries,
    getDiaryEntryById,
    getDiaryEntryByDate,
    postDiaryEntry,
    uploadImage,
    putDiaryEntry,
    deleteDiaryEntry,
};
