"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//TODO remove unused libraries redundant
import multer from 'multer';
const upload = multer({ dest: "uploads/" });
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
import Diary from "../models/diary.js";
function getAllDiaryEntries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allDiaryEntries = yield Diary.find();
            res.status(200).json(allDiaryEntries);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function getRecentDiaryEntries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recentDiaryEntries = yield Diary.find({}).sort({ date: -1 }).limit(3);
            res.status(200).json(recentDiaryEntries);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function getDiaryEntryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const oneDiaryEntry = yield Diary.findById(id);
            if (!oneDiaryEntry) {
                res.status(404).json({ message: "Diary entry not found" });
            }
            res.status(200).json(oneDiaryEntry);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function getDiaryEntryByDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date } = req.params;
            const foundDiaryEntry = yield Diary.findOne({ date }).exec();
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
    });
}
function postDiaryEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, text, date, imageUrl, tags } = req.body;
            const diaryEntryToAdd = yield Diary.create({
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
    });
}
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function uploadImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received image upload request");
            if (!req.file) {
                res.status(400).json({ error: "No image uploaded" });
            }
            else {
                const result = yield cloudinary.uploader.upload(req.file.path, {
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
    });
}
function putDiaryEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, text, date, imageUrl, tags } = req.body; // Include tags
            const updatedDiaryEntry = yield Diary.findByIdAndUpdate(id, {
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
    });
}
function deleteDiaryEntry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedEntry = yield Diary.findByIdAndDelete(id);
            if (!deletedEntry) {
                res.status(404).json({ message: "Diary entry not found" });
            }
            res.status(200).json({ message: "Diary entry deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
export default {
    getAllDiaryEntries,
    getRecentDiaryEntries,
    getDiaryEntryById,
    getDiaryEntryByDate,
    postDiaryEntry,
    uploadImage,
    putDiaryEntry,
    deleteDiaryEntry,
};
