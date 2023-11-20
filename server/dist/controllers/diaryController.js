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
dotenv_1.default.config({ path: '../.env' });
const diary_js_1 = __importDefault(require("../models/diary.js"));
const userUtils_js_1 = require("../utils/userUtils.js");
const user_js_1 = __importDefault(require("../models/user.js"));
async function getAllDiaryEntries(req, res) {
    try {
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
        const { user } = validatedUser;
        res.status(200).json(user.diary_entries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function getRecentDiaryEntries(req, res) {
    try {
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
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
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
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
//change to get all
async function getDiaryEntryByDate(req, res) {
    try {
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
        const { date } = req.params;
        console.log(req.params);
        // console.log(date)
        const foundDiaryEntry = await diary_js_1.default.find({ date });
        // console.log(foundDiaryEntry)
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
// async function getDiaryEntryByDate(req: Request, res: Response) {
//     try {
//         const { date } = req.params;
//         const foundDiaryEntry = await Diary.findOne({ date }).exec();
//         if (!foundDiaryEntry) {
//             return res
//                 .status(404)
//                 .json({ message: "No diary entry found for the date" });
//         }
//         res.status(200).json(foundDiaryEntry);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
async function postDiaryEntry(req, res) {
    try {
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
        const { title, text, date, imageUrl, tags } = req.body;
        const { user_id } = validatedUser;
        const updatedUser = await user_js_1.default.findOneAndUpdate({ user_id }, {
            $push: {
                diary_entries: {
                    title,
                    text,
                    date,
                    imageUrl,
                    tags
                }
            }
        }, { new: true } // To get the updated user data
        );
        res.status(201).json({ message: "Success" });
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
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user)
            return res.status(401).json({ error: validatedUser });
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
