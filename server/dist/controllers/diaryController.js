"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
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
        const pushedDiaryEntry = updatedUser?.diary_entries[updatedUser.diary_entries.length - 1];
        res.status(201).json(pushedDiaryEntry);
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
        const validatedUser = await (0, userUtils_js_1.validateUser)(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) {
            return res.status(401).json({ error: validatedUser });
        }
        const { id } = req.params;
        const { user_id } = validatedUser;
        const { title, text, date, imageUrl, tags } = req.body;
        const updatedUser = await user_js_1.default.findOneAndUpdate({
            user_id,
            'diary_entries._id': id, // Assuming each diary entry has a unique ID
        }, {
            $set: {
                'diary_entries.$.title': title,
                'diary_entries.$.text': text,
                'diary_entries.$.date': date,
                'diary_entries.$.imageUrl': imageUrl,
                'diary_entries.$.tags': tags,
            },
        }, { new: true } // To get the updated user data
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "Diary entry not found" });
        }
        const updatedDiaryEntry = updatedUser.diary_entries.find((entry) => entry._id?.toString() === id);
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
        const { user_id } = validatedUser;
        console.log(id);
        const updatedUser = await user_js_1.default.findOneAndUpdate({ user_id }, {
            $pull: {
                diary_entries: { _id: id }
            }
        }, { new: true } // To get the updated user data
        );
        if (!updatedUser) {
            res.status(404).json({ message: "Diary entry not found" });
            return;
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
    postDiaryEntry,
    uploadImage,
    putDiaryEntry,
    deleteDiaryEntry,
};
